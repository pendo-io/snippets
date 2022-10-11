## Aggregations
This repository contains custom aggregations queries, intended to utilize the [Pendo Aggregations API](https://developers.pendo.io/docs/?bash#aggregation).  These can be used to extract data out of Pendo in a custom format, usually in batch.

Assistance for writing custom aggregations can be provided in the form of a Professional Services Engagement (services@pendo.io).  These will require a custom services contract in order to complete.

### Examples
All calls are POSTs to the same endpoint and require the same headers. The request body determines which Pendo data will be returned.

POST https://app.pendo.io/api/v1/aggregation

Headers:
  X-Pendo-Integration-Key: {{ generate here: https://app.pendo.io/admin/integrations/integration-keys }}
  Content-Type: application/json
