#!/usr/bin/env ruby
require 'json'
require 'optparse'
require 'time'
require 'httparty'
require 'csv'

LOG_FILE = './custom-metadata-upload.log'
MAX_RATE_LIMIT_RETRIES = 5 # for HTTP 429
MAX_ERROR_RETRIES = 3 # for network errors and HTTP 5xx
FIRST_BACKOFF_SECONDS = 2

# Appends a timestamped line to the log file and prints it.
# Never pass the integration key or request headers to this.
def log(level, message)
  line = "#{Time.now.utc.iso8601(3)} #{level} #{message}"
  File.open(LOG_FILE, 'a') { |f| f.puts(line) }
  if level == 'ERROR' || level == 'WARN'
    warn line
  else
    puts line
  end
end

options = { host: 'app.pendo.io', batch_size: '500', debug: false }
parser = OptionParser.new do |opts|
  opts.banner = 'Usage: ruby custom_metadata_upload.rb [options]'
  opts.on('-f', '--file FILE', 'CSV file to import') { |v| options[:file] = v }
  opts.on('-i', '--integration-key KEY', 'Pendo integration key (needs write access)') { |v| options[:integration_key] = v }
  opts.on('-t', '--metadata-type TYPE', "'visitor' or 'account'") { |v| options[:type] = v }
  opts.on('--host HOST', 'Pendo host you sign in to (default: app.pendo.io)') { |v| options[:host] = v }
  opts.on('-b', '--batch-size NUMBER', 'Records per request (default: 500)') { |v| options[:batch_size] = v }
  opts.on('-d', '--debug', 'Log the size of each request') { options[:debug] = true }
  opts.on('-h', '--help', 'Show this help') do
    puts opts
    exit 0
  end
end

# Prints the problem and the usage, then exits with code 2
fail_with_usage = lambda do |message|
  warn "error: #{message}"
  warn ''
  warn parser
  exit 2
end

begin
  parser.parse!
rescue OptionParser::ParseError => e
  fail_with_usage.call(e.message)
end

fail_with_usage.call("unexpected argument(s): #{ARGV.join(' ')}") unless ARGV.empty?
unless options[:file] && File.file?(options[:file])
  fail_with_usage.call("--file must be an existing CSV file (got: #{options[:file] || 'nothing'})")
end
if options[:integration_key].to_s.strip.empty?
  fail_with_usage.call('--integration-key is required')
end
unless %w[visitor account].include?(options[:type])
  fail_with_usage.call("--metadata-type must be 'visitor' or 'account'")
end
unless options[:host].match?(/\A[A-Za-z0-9.-]+\z/)
  fail_with_usage.call('--host must be a hostname only, for example app.eu.pendo.io (no https:// or path)')
end
unless options[:batch_size].match?(/\A\d+\z/) && options[:batch_size].to_i >= 1
  fail_with_usage.call('--batch-size must be a positive whole number')
end
batch_size = options[:batch_size].to_i

# For testing only: point the script at a local mock server
base_url = ENV['PENDO_API_BASE_URL'] || "https://#{options[:host]}"
api_url = "#{base_url}/api/v1/metadata/#{options[:type]}/custom/value"

# Read the CSV. Row numbers count the header as row 1 and skip empty lines.
begin
  rows = CSV.parse(File.read(options[:file], encoding: 'bom|utf-8'), skip_blanks: true)
rescue CSV::MalformedCSVError => e
  fail_with_usage.call("could not read the CSV file: #{e.message}")
end
fail_with_usage.call('the CSV file is empty; it needs a header row') if rows.empty?

fields = rows[0].drop(1)
records = []

rows.drop(1).each_with_index do |row, index|
  row_number = index + 2
  id = row[0].to_s
  if id.strip.empty?
    log('WARN', "Row #{row_number}: skipped, the ID is empty")
    next
  end
  values = {}
  fields.each_with_index { |field, i| values[field] = row[i + 1] || '' }
  records << { row_number: row_number, entry: { "#{options[:type]}Id" => id, 'values' => values } }
end

# Posts one batch, retrying rate limits, network errors, and 5xx responses
def post_batch(api_url, integration_key, body, label)
  attempt = 0
  loop do
    status = nil
    response_body = nil
    retry_after = nil
    network_error = nil
    begin
      response = HTTParty.post(
        api_url,
        headers: { 'Content-Type' => 'application/json', 'X-Pendo-Integration-Key' => integration_key },
        body: body,
        timeout: 120
      )
      status = response.code
      response_body = response.body
      retry_after = response.headers['retry-after']
    rescue StandardError => e
      network_error = "#{e.class}: #{e.message}"
    end

    return { ok: true, status: status, body: response_body } if status && status >= 200 && status < 300

    max_retries =
      if status == 429 then MAX_RATE_LIMIT_RETRIES
      elsif network_error || status >= 500 then MAX_ERROR_RETRIES
      else 0
      end
    if attempt >= max_retries
      return { ok: false, status: status, body: response_body, network_error: network_error }
    end

    wait = FIRST_BACKOFF_SECONDS * 2**attempt
    wait = retry_after.strip.to_i if status == 429 && retry_after.to_s.strip.match?(/\A\d+\z/)
    reason = network_error ? "network error (#{network_error})" : "HTTP #{status}"
    log('WARN', "#{label}: #{reason}, retrying in #{wait}s (retry #{attempt + 1} of #{max_retries})")
    sleep(wait)
    attempt += 1
  end
end

def describe_body(body)
  body.nil? || body.empty? ? '(empty body)' : body
end

log('INFO', "Uploading #{records.length} #{options[:type]} record(s) from #{options[:file]} to #{api_url} in batches of #{batch_size}")

batches_ok = 0
batches_failed = 0
rows_sent = 0

records.each_slice(batch_size).with_index(1) do |batch, batch_number|
  label = "Batch #{batch_number} (rows #{batch.first[:row_number]} to #{batch.last[:row_number]})"
  body = batch.map { |record| record[:entry] }.to_json
  log('DEBUG', "#{label}: #{batch.length} record(s), #{body.bytesize} bytes") if options[:debug]

  result = post_batch(api_url, options[:integration_key], body, label)
  if result[:ok]
    batches_ok += 1
    rows_sent += batch.length
    log('INFO', "#{label}: HTTP #{result[:status]} #{describe_body(result[:body])}")
  else
    batches_failed += 1
    outcome = result[:network_error] ? "network error (#{result[:network_error]})" : "HTTP #{result[:status]} #{describe_body(result[:body])}"
    log('ERROR', "#{label}: failed, #{outcome}")
  end
end

log(batches_failed > 0 ? 'ERROR' : 'INFO',
    "Done. Batches: #{batches_ok} ok, #{batches_failed} failed. Rows sent: #{rows_sent} of #{records.length}.")
exit(batches_failed > 0 ? 1 : 0)
