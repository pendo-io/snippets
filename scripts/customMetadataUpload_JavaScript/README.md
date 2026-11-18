# Custom Metadata Upload Script (JavaScript)

This script uploads custom metadata fields for visitors or accounts into Pendo. It reads a CSV file whose first column is the visitor or account ID and whose other columns are custom metadata fields, then sends the values to the Pendo API in batches.

---

## Installation

You need Node.js 22.12 or later. In this folder, run:

```shell
npm install
```

This installs the dependencies listed in `package.json`: `commander`, `axios`, and `papaparse`.

---

## Options

```shell
$ node custom-metadata-upload.js --help
```

| Option | Description |
|---|---|
| `-f`, `--file <path>` | Path to the CSV file to import. Required; the file must exist. |
| `-i`, `--integration-key <key>` | Pendo integration key with write access. Required. |
| `-t`, `--metadata-type <type>` | `visitor` or `account`. Required. |
| `--host <host>` | The host you sign in to Pendo with, without `https://` or a path. Default: `app.pendo.io`. For example, use `app.eu.pendo.io` for EU subscriptions. |
| `-b`, `--batch-size <number>` | Records sent per request. Must be a positive whole number. Default: `500`. |
| `-d`, `--debug` | Also log the number of records and the size in bytes of each request. Request headers are never logged. |
| `-h`, `--help` | Show the usage. |

---

## Examples

```shell
$ node custom-metadata-upload.js -f custom-metadata-test.csv -i <integration key> -t visitor
```

For an EU subscription, with smaller batches and debug output:

```shell
$ node custom-metadata-upload.js --file accounts.csv --integration-key <integration key> --metadata-type account --host app.eu.pendo.io --batch-size 200 --debug
```

You can also use `npm start`, passing the options after `--`:

```shell
$ npm start -- -f custom-metadata-test.csv -i <integration key> -t visitor
```

---

## File Format

The CSV file _must_ have a header row. The first column holds the visitor ID (for `-t visitor`) or account ID (for `-t account`); its header name isn't used. The other headers must be the custom metadata field names you want to set, exactly as they appear in Pendo.

```csv
visitorID,customfield1,customfield2,customfield3
1234,Mechanical,Teacher,Jacksonville
```

Empty lines are skipped. Rows with an empty ID are skipped with a warning that gives the row number. Row numbers count the header as row 1 and don't count empty lines. A missing value is sent as an empty string.

---

## Output

Each line is printed and also appended, with a timestamp, to `custom-metadata-upload.log` in the directory you run the script from. For each batch the log shows the batch number, the CSV row range, the HTTP status, and the response body. A summary at the end gives the number of batches that succeeded and failed, and the number of rows sent. The integration key and request headers are never logged.

## Retries

- HTTP 429 (rate limited): the script waits for the number of seconds in the `Retry-After` header, or else 2, 4, 8, and so on seconds, and retries up to 5 times.
- Network errors and HTTP 5xx: retried up to 3 times, waiting 2, 4, and 8 seconds.
- Any other response outside 200 to 299 (for example 400 or 401) fails the batch without a retry.

A failed batch doesn't stop the script: the remaining batches are still sent.

## Exit Codes

| Code | Meaning |
|---|---|
| 0 | Every batch was accepted (or there were no rows to send). |
| 1 | At least one batch failed after its retries. |
| 2 | Invalid options or an unreadable CSV file; nothing was sent. |

## Testing

To try the script against a local mock server instead of Pendo, set `PENDO_API_BASE_URL` to the server's base URL, for example `PENDO_API_BASE_URL=http://127.0.0.1:8080`. It replaces `https://<host>`; the rest of the path stays the same.
