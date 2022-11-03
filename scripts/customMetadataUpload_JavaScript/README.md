# Custom Metadata Upload Script

This script can be used to upload custom metadata fields for a visitor or account into Pendo. It takes a CSV file as an input, the first column of which _must_ be a visitorID or accountID column, as identified by the -t argument into the script. Then the script will iterate through the rest of the columns and populate them as custom metadata values with each respective header and row value, converted into JSON.

---

## Installation

You might need to use 'sudo' depending on your local install.

```shell
npm install logger
npm install commander
npm install axios
npm install papaparse
npm install fs-extra
```

---

## Instructions

```shell
$ node custom-metadata-upload.js --help
Usage: custom-metadata-upload [options]

Send or update custom metadata for visitors/accounts.

Options:
  -f, --file <string>             CSV Import File
  -d                              --debug
  -i, --integration-key <string>  X-Pendo-Integration-Key
  -t, --metadata-type <string>    'visitor' or 'account'
  -h, --help                      display help for command
```

---

## Example

```shell
$ node custom-metadata-upload.js -f custom-metadata-test.csv -i cded0000-0000-0000-0000-00008980000.us -t visitor
```

## File Format

The CSV file _must_ have headers, with the correct metadata key names that you wish to upload. The first column _must_ either be visitorID or accountID, case sensitive.

## Output

Results from the script (including successes, failures, and HTTP request info) will be output to a file called custom-metadata-output.log, in the same directory as the one where you run the script.
