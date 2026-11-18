## Aggregations
This repository contains custom aggregations queries, intended to utilize the [Pendo Aggregations API](https://developers.pendo.io/docs/?bash#aggregation).  These can be used to extract data out of Pendo in a custom format, usually in batch.

Assistance for writing custom aggregations can be provided in the form of a Professional Services Engagement (services@pendo.io).  These will require a custom services contract in order to complete.

### Examples
All calls are POSTs to the same endpoint and require the same headers. The request body determines which Pendo data will be returned.

POST https://app.pendo.io/api/v1/aggregation

If your Pendo subscription is hosted outside the US, use the host you sign in to Pendo with instead of `app.pendo.io` (for example `app.eu.pendo.io` for EU subscriptions).

Headers:
  X-Pendo-Integration-Key: {{ generate here: https://app.pendo.io/admin/integrations/integration-keys }}
  Content-Type: application/json

### Before you run a query

Some queries contain placeholders that must be replaced with IDs from your own subscription:

| File | Placeholder | Replace with |
|---|---|---|
| `browserAndDeviceUsageForPage.json` | `your-page-id-here` | The ID of a tagged page |
| `numberOfUniquePageParamsSeenPerAccount.json` | `PAGE-ID-HERE` | The ID of a tagged page |
| `visitorsInSegmentWithAccountMetadata.json` | `SEGMENT ID` | The ID of a segment |

You can find a page or segment ID in the URL when you open it in Pendo.

### Date ranges

The event queries (every file here except `visitorsInSegmentWithAccountMetadata.json`) set their own date range in a `timeSeries` block. For example, `"first": "dateAdd(startOfPeriod(\"daily\",now()),-2,\"days\")"` with `"last": "dateAdd(startOfPeriod(\"daily\",now()),-1,\"days\")"` covers the two days before today. Adjust `first` and `last` (or `count`) to change the range; longer ranges return more data and take longer to run.

`visitorsInSegmentWithAccountMetadata.json` is the exception: it reads from the `visitors` source, has no `timeSeries` block, and returns every visitor in the segment regardless of when they were active.
