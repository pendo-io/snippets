#!/usr/bin/env ruby
require 'rubygems'
require 'json'
require 'logger'
require 'optparse'
require 'httparty'
require 'csv'
require 'uri-handler'
require 'pry'

logger = Logger::new("./custom-metadata-upload.log")

options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: custom_field.rb [options]"

  opts.on("-f n", "--file", "CSV Import File") do |f|
    options[:file] = f
  end

  opts.on("-d n", "--debug", "Enables HTTP debugger") do |d|
    options[:debug] = d
  end 

  opts.on("-i n", "--integration-key", "X-Pendo-Integration-Key") do |i|
    options[:integration_key] = i
  end

  opts.on("-t n", "--metadata-type", "'visitor' or 'account'") do |t|
    options[:type] = t
  end
end.parse!

# Read File from Path
file_contents = CSV.parse(File.read(options[:file]), headers: true)
integration_key = options[:integration_key] 
headers = file_contents.headers.drop(1)
request_body_array = []

file_contents.each do |row|
  id = row[0].to_s
  request_entry = {
    "#{options[:type]}Id" => id,
    "values" => {}
    }

  headers.each_with_index do |header, index|
    request_entry["values"][header] = row[index+1] || ""
  end

  request_body_array.push(request_entry)
end
    
endpoint_url = "https://app.pendo.io/api/v1/metadata/#{options[:type]}/custom/value"

http_headers = { 
  "Content-Type" => "application/json",
  "X-Pendo-Integration-Key" => integration_key,
}

begin
  request = HTTParty.post(
    endpoint_url,
    headers: http_headers, 
    body: request_body_array.to_json,
    logger: logger, log_level: :info, log_format: :curl
  )

rescue HTTParty::Error
  logger.error("HTTParty error for #{row[1]}")
rescue StandardError
  logger.error("Standard error for #{row[1]}")
end

