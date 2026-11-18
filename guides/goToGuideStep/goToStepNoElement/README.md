# Go to Step if No Element

Checks whether the target element of the next step is present and visible. If it is, the guide advances one step as normal; if it is not, the guide jumps to a step you choose. Use it on a "routing" step so visitors skip steps whose targets are missing.

## Files

- `gotoStepNoElement.js`: JS tab of a Custom Code Block on the step just before the step whose element you want to check. Runs the check immediately.
- `goToStepNoElementWithDelay.js`: Same as above, but waits 1500 milliseconds before checking. Use this when the element may not be on the page yet when the step loads.

## Setup

1. Add a Custom Code Block to the step that comes right before the element-targeted step, and paste one of the two files into its JS tab.
2. Set `desiredStep` to the step number (as shown in Pendo, starting at 1) to jump to when the element is missing. The defaults are `5` in `gotoStepNoElement.js` and `11` in `goToStepNoElementWithDelay.js`.
3. Optional: to target a step by ID instead of by number, comment out the `pendo.goToStep` line that uses `desiredStep` and uncomment the line with `destinationStepId`, replacing the example ID `"N9d7QgG8ZxOBqeUmZr4dn92yltE"` with your step ID. Also delete the trailing `<-- Example Step ID` note on that line; left in place, it is a JavaScript syntax error and the snippet won't run. The comments describe the step ID as the stronger reference.
4. For the delayed version, change `1500` in the `setTimeout` call to adjust the wait in milliseconds.

## Notes

- The check runs as soon as the step loads (or after the delay), and the guide always moves on: either to the next step or to `desiredStep`. Visitors will see this step only briefly, if at all.
- The "next step" is found by position: the step immediately after the one with the code. The code needs a next step to exist.
- An element counts as missing if no element matches the next step's target, or if none of the matches are visible.
- Each branch writes a message to the Pendo log (`advance to designated step` or `advance 1 step`).
