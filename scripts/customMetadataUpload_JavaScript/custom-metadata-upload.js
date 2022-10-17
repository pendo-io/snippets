var logger = require('logger').createLogger('./custom-metadata-upload.log');
var { Command } = require('commander');
var axios = require('axios');
var Papa = require('papaparse');
var fs = require('fs-extra');
const program = new Command();
let options = {};

program
	.description('Send or update custom metadata for visitors/accounts.')
	.option('-f, --file <string>', 'CSV Import File', (f) => (options.file = f))
	.option('-d', '--debug', 'Enables HTTP debugger', (d) => (options.debug = d))
	.option(
		'-i, --integration-key <string>',
		'X-Pendo-Integration-Key',
		(i) => (options.integration_key = i)
	)
	.option('-t, --metadata-type <string>', "'visitor' or 'account'", (t) => (options.type = t));

program.parse();

// Read File from Path
let csvFile = Papa.parse(fs.readFileSync(options.file, 'utf8'), {
	headers: false,
	worker: false,
});
let file_contents = csvFile.data;
let headers = file_contents.shift().slice(1, 4);
let request_body_array = [];

file_contents.forEach((row) => {
	let id = row[0].toString();
	let request_entry = { [`${options.type}Id`]: id, values: {} };

	headers.forEach((header, index) => (request_entry.values[header] = row[index + 1] || ''));

	request_body_array.push(request_entry);
	return (request_body = JSON.stringify(request_body_array));
});

let apiUrl = `https://app.pendo.io/api/v1/metadata/${options.type}/custom/value`;

let http_headers = {
	'Content-Type': 'application/json',
	'X-Pendo-Integration-Key': options.integration_key,
};

let uploadCustomMetadata = () => {
	axios
		.post(apiUrl, request_body, {
			headers: http_headers,
		})
		.then(function (response) {
			logger.info(response);
		})
		.catch(function (error) {
			logger.error(error);
			console.log(error);
		});
};

uploadCustomMetadata();
