# Custom Metadata Upload Script
This script can be used to upload custom metadata fields for a visitor or account into Pendo.  It takes a CSV file as an input, the first column of which *must* be a visitorID or accountID column, as identified by the -t argument into the script.  Then the script will iterate through the rest of the columns and populate them as custom metadata values with each respective header and row value, converted into JSON.

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
gem install pry
```

---

## Instructions

```shell
$ ruby feedback_enduser_import.rb --help
Usage: feedback_enduser_import.rb [options]
    -f, --file n                     CSV Metadata File
    -i, --integration_key n          Pendo Integration Key
    -t, --type n                     ID Type (options are 'visitor' or 'account')
```

---

## Example

```shell
$ ruby custom_metadata_upload.rb -f custom-metadata-test.csv -i cded0000-0000-0000-0000-00008980000.us -t visitor
```

## File Format
The CSV file *must* have headers, with the correct metadata key names that you wish to upload.  The first column *must* either be visitorID or accountID, case sensitive.

## Output
Results from the script (including successes, failures, and HTTP request info) will be output to a file called custom-metadata-output.log, in the same directory as the one where you run the script.