# Block App Above Backdrop

Places an invisible layer over the highlighted area of a guide backdrop so visitors cannot click the application through the "open" part of the backdrop. Use it when you want to highlight an element but not let visitors interact with it while the guide is shown.

## Files

- `blockAppAboveBackdrop.js`: JS tab of a Custom Code Block on a step that uses a backdrop with a highlighted target element.

## Setup

1. Turn on the backdrop for the step so Pendo highlights the target element.
2. Paste the code into the JS tab of a Custom Code Block on that step.
3. If the layer appears above or below the wrong content, adjust `'z-index': '200000'`.

## Notes

- Does nothing in the Visual Design Studio (`pendo.designerEnabled`).
- Does nothing if `#pendo-backdrop`, `.pendo-backdrop-region-top`, or `.pendo-backdrop-region-bottom` is not found.
- The layer's position and size are measured once, when the code runs. It covers the full width of the top backdrop region, between the bottom of the top region and the top of the bottom region.
- The layer has `opacity: 0`, so the highlighted element stays visible, and `pointer-events: all`, so it catches clicks.
- The layer is added inside the Pendo backdrop with the class `pendo-backdrop-c-region-open`.
