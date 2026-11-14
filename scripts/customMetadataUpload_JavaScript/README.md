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

The `-d` (`--debug`) option has no effect at the moment: its value is stored but never used.

The script sends requests to `app.pendo.io`. If your subscription is hosted in another region, edit `apiUrl` in the script and replace only the `app.pendo.io` part with the host you sign in to Pendo with, keeping `https://` and the rest of the path. For example, for EU subscriptions:

```js
let apiUrl = `https://app.eu.pendo.io/api/v1/metadata/${options.type}/custom/value`;
```

## File Format

The CSV file _must_ have headers, with the correct metadata key names that you wish to upload. The first column _must_ either be visitorID or accountID, case sensitive.

## Output

Results from the script (including successes, failures, and HTTP request info) will be output to a file called custom-metadata-output.log, in the same directory as the one where you run the script.
