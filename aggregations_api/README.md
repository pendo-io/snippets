Examples of pulling data from Pendo's public aggregation API https://developers.pendo.io/docs/?python#aggregation

All calls are POSTs to the same endpoint and require the same headers. The request body determines which Pendo data will be returned.

POST https://app.pendo.io/api/v1/aggregation

Headers:
  X-Pendo-Integration-Key: {{ generate here: https://app.pendo.io/admin/integrations/integration-keys }}
  Content-Type: application/json
