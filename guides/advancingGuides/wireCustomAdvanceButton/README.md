# Wire Custom Advance Button

Makes any element inside the guide with the class `_pendo-guide-next_` act as a "Next" button. Use it when you have added your own button or link markup to a guide and want clicks on it to advance the guide.

## Files

- `wireCustomAdvanceButton.js`: JS for the guide step that contains the custom button.

## Setup

1. Add the class `_pendo-guide-next_` to the element (or a parent of the element) that should advance the guide.
2. Paste the code into the JS of the same step.

## Notes

- The code listens for clicks on the whole guide element (`step.guideElement`) and checks whether the clicked element is, or sits inside, an element with the class `_pendo-guide-next_`. Clicks anywhere else in the guide are ignored.
- When a match is found, it calls `pendo.onGuideAdvanced()`.
- If `step` is not available, the code does nothing.
