const fs = require('fs');
const { Command } = require('commander');
const axios = require('axios');
const Papa = require('papaparse');

const LOG_FILE = './custom-metadata-upload.log';
const MAX_RATE_LIMIT_RETRIES = 5; // for HTTP 429
const MAX_ERROR_RETRIES = 3; // for network errors and HTTP 5xx
const FIRST_BACKOFF_SECONDS = 2;

// Appends a timestamped line to the log file and prints it.
// Never pass the integration key or request headers to this.
function log(level, message) {
	const line = `${new Date().toISOString()} ${level} ${message}`;
	fs.appendFileSync(LOG_FILE, line + '\n');
	if (level === 'ERROR' || level === 'WARN') {
		console.error(line);
	} else {
		console.log(line);
	}
}

const program = new Command();
program
	.name('custom-metadata-upload')
	.description('Send or update custom metadata for visitors or accounts.')
	.option('-f, --file <path>', 'CSV file to import')
	.option('-i, --integration-key <key>', 'Pendo integration key (needs write access)')
	.option('-t, --metadata-type <type>', "'visitor' or 'account'")
	.option('--host <host>', 'Pendo host you sign in to', 'app.pendo.io')
	.option('-b, --batch-size <number>', 'records per request', '500')
	.option('-d, --debug', 'log the size of each request')
	.showHelpAfterError()
	// Exit 0 for --help, 2 for any option error
	.exitOverride((err) => process.exit(err.exitCode === 0 ? 0 : 2));
program.parse();
const options = program.opts();

// Prints the problem and the usage, then exits with code 2
function fail(message) {
	program.error(`error: ${message}`, { exitCode: 2 });
}

if (!options.file || !fs.existsSync(options.file) || !fs.statSync(options.file).isFile()) {
	fail(`--file must be an existing CSV file (got: ${options.file || 'nothing'})`);
}
if (!options.integrationKey || !options.integrationKey.trim()) {
	fail('--integration-key is required');
}
if (options.metadataType !== 'visitor' && options.metadataType !== 'account') {
	fail("--metadata-type must be 'visitor' or 'account'");
}
if (!/^[A-Za-z0-9.-]+$/.test(options.host)) {
	fail('--host must be a hostname only, for example app.eu.pendo.io (no https:// or path)');
}
if (!/^\d+$/.test(options.batchSize) || Number(options.batchSize) < 1) {
	fail('--batch-size must be a positive whole number');
}
const batchSize = Number(options.batchSize);

// For testing only: point the script at a local mock server
const baseUrl = process.env.PENDO_API_BASE_URL || `https://${options.host}`;
const apiUrl = `${baseUrl}/api/v1/metadata/${options.metadataType}/custom/value`;

// Read the CSV. Row numbers count the header as row 1 and skip empty lines.
const csv = Papa.parse(fs.readFileSync(options.file, 'utf8'), {
	header: false,
	skipEmptyLines: true,
});
const rows = csv.data;
if (rows.length === 0) {
	fail('the CSV file is empty; it needs a header row');
}
const fields = rows[0].slice(1);
const records = [];

rows.slice(1).forEach((row, index) => {
	const rowNumber = index + 2;
	const id = String(row[0] || '');
	if (!id.trim()) {
		log('WARN', `Row ${rowNumber}: skipped, the ID is empty`);
		return;
	}
	const values = {};
	fields.forEach((field, i) => (values[field] = row[i + 1] || ''));
	records.push({ rowNumber, entry: { [`${options.metadataType}Id`]: id, values } });
});

const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

// Posts one batch, retrying rate limits, network errors, and 5xx responses
async function postBatch(body, label) {
	for (let attempt = 0; ; attempt++) {
		let status;
		let data;
		let retryAfter;
		let networkError;
		try {
			const response = await axios.post(apiUrl, body, {
				headers: {
					'Content-Type': 'application/json',
					'X-Pendo-Integration-Key': options.integrationKey,
				},
				timeout: 120000,
				validateStatus: () => true, // check the status ourselves
			});
			status = response.status;
			data = response.data;
			retryAfter = response.headers['retry-after'];
		} catch (error) {
			// Only the message: the error object includes the request headers
			networkError = error.message;
		}

		if (status >= 200 && status < 300) {
			return { ok: true, status, data };
		}

		const maxRetries = status === 429 ? MAX_RATE_LIMIT_RETRIES : networkError || status >= 500 ? MAX_ERROR_RETRIES : 0;
		if (attempt >= maxRetries) {
			return { ok: false, status, data, networkError };
		}

		let wait = FIRST_BACKOFF_SECONDS * 2 ** attempt;
		if (status === 429 && /^\d+$/.test(String(retryAfter || '').trim())) {
			wait = Number(retryAfter);
		}
		const reason = networkError ? `network error (${networkError})` : `HTTP ${status}`;
		log('WARN', `${label}: ${reason}, retrying in ${wait}s (retry ${attempt + 1} of ${maxRetries})`);
		await sleep(wait);
	}
}

function describeBody(data) {
	if (data === undefined || data === '') {
		return '(empty body)';
	}
	return typeof data === 'string' ? data : JSON.stringify(data);
}

async function main() {
	log('INFO', `Uploading ${records.length} ${options.metadataType} record(s) from ${options.file} to ${apiUrl} in batches of ${batchSize}`);

	let batchesOk = 0;
	let batchesFailed = 0;
	let rowsSent = 0;

	for (let start = 0; start < records.length; start += batchSize) {
		const batch = records.slice(start, start + batchSize);
		const batchNumber = start / batchSize + 1;
		const label = `Batch ${batchNumber} (rows ${batch[0].rowNumber} to ${batch[batch.length - 1].rowNumber})`;
		const body = JSON.stringify(batch.map((record) => record.entry));
		if (options.debug) {
			log('DEBUG', `${label}: ${batch.length} record(s), ${Buffer.byteLength(body)} bytes`);
		}

		const result = await postBatch(body, label);
		if (result.ok) {
			batchesOk++;
			rowsSent += batch.length;
			log('INFO', `${label}: HTTP ${result.status} ${describeBody(result.data)}`);
		} else {
			batchesFailed++;
			const outcome = result.networkError ? `network error (${result.networkError})` : `HTTP ${result.status} ${describeBody(result.data)}`;
			log('ERROR', `${label}: failed, ${outcome}`);
		}
	}

	const level = batchesFailed ? 'ERROR' : 'INFO';
	log(level, `Done. Batches: ${batchesOk} ok, ${batchesFailed} failed. Rows sent: ${rowsSent} of ${records.length}.`);
	process.exitCode = batchesFailed ? 1 : 0;
}

main();
