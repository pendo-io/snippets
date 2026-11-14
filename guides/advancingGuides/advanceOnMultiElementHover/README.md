# Advance Guide on Multi-Element Hover

Advances the guide to the next step when the visitor hovers over any one of several elements in your application. Use it when more than one element should count as "the thing to hover" for a step.

## Files

- `advanceOnMultiElementHover.js`: JS tab of a Custom Code Block on the step that should advance on hover.

## Setup

1. Paste the code into the JS tab of a Custom Code Block on the step.
2. Replace the selectors `#id-number-1` and `#id-number-2` (variables `one` and `two`) with selectors for your own elements. IDs (`#myId`) and classes (`.myClass`) both work.
3. To watch more elements, add another variable (for example `var three = dom('#id-number-3');`) and add it to the `elms` array, for example `[one, two, three]`.

## Notes

- The guide advances only once, even if the visitor hovers over several of the elements (the handler is wrapped in `pendo._.once`).
- Only the first match for each selector gets a listener. If a selector matches several elements, the others are ignored.
- Each element must exist on the page when the step is shown; the code does not wait for elements to appear.
- The hover listeners are removed when the step is torn down.
