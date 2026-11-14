# Date Picker Poll

Adds a native date picker to a guide and copies the chosen date into a hidden open text poll, so the date is captured as a poll response.

## Files

- `datepicker.html`: HTML tab of a Custom Code Block on the step with the poll.
- `datepicker.js`: JS tab of the same Custom Code Block.

## Setup

1. Add an open text poll to the step and set its placeholder text to exactly `hidden box`.
2. Add a Custom Code Block to the same step and paste each file into its matching tab.
3. Change the label text `Birthday:` in `datepicker.html` to suit your question.
4. Make sure the step has a button that submits the poll response.

## Notes

- When the guide is previewed or live (`pendo.designerEnabled` is false), the code hides the open text poll by setting `display: none` on the poll input's third parent element. In the Visual Design Studio the poll stays visible so you can edit it.
- Each time the date changes, `pendo.syncFields` copies the date input's value (format `YYYY-MM-DD`) into the hidden poll box.
- The date input uses the ID `datepicker`; keep it in sync between the HTML and JS if you rename it.
- The date is only captured if the step has an open text poll with the placeholder `hidden box`.
