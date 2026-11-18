# Custom Metadata Upload Script

This script can be used to upload custom metadata fields for a visitor or account into Pendo. It takes a CSV file as an input, the first column of which _must_ be a visitorID or accountID column, as identified by the -t argument into the script. Then the script will iterate through the rest of the columns and populate them as custom metadata values with each respective header and row value, converted into JSON.

---

## Installation

You might need to use 'sudo' depending on your local install.

```shell
gem install rubygems
gem install json
gem install logger
gem install optparse
gem install httparty
gem install csv
```

---

## Instructions

```shell
$ ruby custom_metadata_upload.rb -f <csv file> -i <integration key> -t <visitor|account>
```

| Option | Description |
|---|---|
| `-f` | Path to the CSV file to import |
| `-i` | Pendo integration key (needs write access) |
| `-t` | Metadata type: `visitor` or `account` |
| `-d` | Has no effect at the moment: the value is stored but never used, and the option expects a value (for example `-d true`). It can be left out. |

The script sends requests to `app.pendo.io`. If your subscription is hosted in another region, edit `endpoint_url` in the script and replace only the `app.pendo.io` part with the host you sign in to Pendo with, keeping `https://` and the rest of the path. For example, for EU subscriptions:

```ruby
endpoint_url = "https://app.eu.pendo.io/api/v1/metadata/#{options[:type]}/custom/value"
```

---

## Example

```shell
$ ruby custom_metadata_upload.rb -f custom-metadata-test.csv -i cded0000-0000-0000-0000-00008980000.us -t visitor
```

## File Format

The CSV file _must_ have headers, with the correct metadata key names that you wish to upload. The first column _must_ either be visitorID or accountID, case sensitive.

## Output

Results from the script (including successes, failures, and HTTP status codes; the integration key is not logged) will be output to a file called custom-metadata-upload.log, in the same directory as the one where you run the script.
