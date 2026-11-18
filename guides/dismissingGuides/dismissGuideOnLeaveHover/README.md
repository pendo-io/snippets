# Dismiss Guide on Leave Hover

Dismisses a tooltip guide when the visitor moves the mouse off its target element. By default, guides that appear on hover of a target element stay open after the visitor hovers away (unlike badge guides); this snippet adds the badge-style behavior.

## Files

- `dismissGuideOnLeaveHover.js`: JS tab of a Custom Code Block on the tooltip step that is targeted to an element.

## Setup

1. Paste the code into the JS tab of a Custom Code Block on the tooltip step.
2. No values need editing. The code uses the step's own target (`step.elementPathRule`).

## Notes

- The code listens for `mouseover` on the whole window. The guide stays open while the mouse is over the target element or over the tooltip itself (`#pendo-guide-container`), so visitors can move onto the tooltip to use its buttons. As soon as the mouse is over anything else, it calls `pendo.onGuideDismissed()` and removes the listener.
- If the guide closes some other way, the listener is removed when the step is torn down, so it can't dismiss later guides.
- The guide is dismissed (not just hidden), so it follows your guide's normal dismissal rules.
