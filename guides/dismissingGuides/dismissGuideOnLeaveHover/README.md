# Dismiss Guide on Leave Hover

Dismisses a tooltip guide when the visitor moves the mouse off its target element. By default, guides that appear on hover of a target element stay open after the visitor hovers away (unlike badge guides); this snippet adds the badge-style behavior.

## Files

- `dismissGuideOnLeaveHover.js`: JS tab of a Custom Code Block on the tooltip step that is targeted to an element.

## Setup

1. Paste the code into the JS tab of a Custom Code Block on the tooltip step.
2. No values need editing. The code uses the step's own target (`step.elementPathRule`).

## Notes

- The code listens for `mouseover` on the whole window. When the mouse moves away from the target element, it calls `pendo.onGuideDismissed()` and removes the listener.
- Test that visitors can still reach any buttons in the tooltip: moving the mouse from the target onto the tooltip passes outside the target element.
- The guide is dismissed (not just hidden), so it follows your guide's normal dismissal rules.
