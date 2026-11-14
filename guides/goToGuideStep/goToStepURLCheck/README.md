# Go to Step on URL Match

Checks the current URL path when the step loads. If it matches a path you set, the guide jumps to a step you choose; otherwise it advances one step as normal. Use it on a "routing" step to send visitors down different paths of a guide depending on the page they are on.

## Files

- `goToStepUrlCheck.js`: JS tab of a Custom Code Block on the step that should do the check.

## Setup

1. Paste the code into the JS tab of a Custom Code Block on the routing step.
2. Set `properUrl` to the path after the domain, including the leading slash. Default: `"/demo_site"` (for `https://www.domain.com/demo_site`).
3. Set `desiredStep` to the step number (as shown in Pendo, starting at 1) to jump to when the path matches. Default: `3`.
4. Optional: to target a step by ID instead of by number, comment out the `pendo.goToStep` line that uses `desiredStep` and uncomment the line with `destinationStepId`, replacing the example ID `"N9d7QgG8ZxOBqeUmZr4dn92yltE"` with your step ID.

## Notes

- The comparison is an exact match on `window.location.pathname`. Query strings and hashes are not part of the path, but a trailing slash or different capitalization will not match.
- The check runs as soon as the step loads, and the guide always moves on: either to the next step or to `desiredStep`. Visitors will see this step only briefly, if at all.
- To debug matches, uncomment the `console.log` line to print the current path and `properUrl`.
- Each branch writes a message to the Pendo log (`advance to designated step` or `advance 1 step`).
