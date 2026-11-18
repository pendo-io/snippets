# Dismiss Resource Center on Outside Click (Target Element Activation)

Closes the Pendo Resource Center when the visitor clicks outside of it, for Resource Centers that open from a target element in your application instead of the Pendo badge. Two versions are provided; pick one.

## Files

- `dismissRCWhenClickOutsideTargetElementRC.js`: original version. Goes in your application's Pendo install code, as part of the `pendo.initialize` call.
- `dismissRCWhenClickOutsideTargetElementRC_v2.js`: goes in a Custom Code Block on a hidden tooltip guide. No change to your install code is needed.

## Difference between the versions

- The original version adds a `guidesLoaded` event handler to `pendo.initialize`. It reads the activation selector from the Resource Center itself (`getResourceCenter().steps[0].elementPathRule`), so there is no selector to edit. It uses `e.composedPath()` to decide whether a click happened inside `#pendo-resource-center-container`.
- The `_v2` version runs from a guide and uses a hardcoded selector, `rcCustomElement`, for the activation element. It skips work when the Resource Center isn't shown, does nothing in the Pendo Designer, and logs its status with `pendo.log`.

## Setup: original version

1. Merge the `events.guidesLoaded` block from the file into your existing `pendo.initialize` call.
2. Keep your normal `visitor` and `account` metadata; the empty objects in the file are placeholders.

## Setup: `_v2` version

1. Change `rcCustomElement` (default `".custom_rc_element"`) to the CSS selector of the element that opens the Resource Center.
2. Create a tooltip guide that targets that same element.
3. Set the guide to display on Target Element, with "display on hover" and "display every time".
4. Add a Custom Code Block to the guide and paste the `_v2` file into its JS tab.
5. Add this line to the CSS tab of the same Custom Code Block so the tooltip never appears:

   ```css
   display: none !important;
   ```

6. Publish the guide.

## Notes

- In both versions, clicks inside the Resource Center or on the activation element do not close it.
- The `_v2` version attaches its document click listener once and stores it in `pendo.pro.hideRC`. If no Resource Center is found when the guide runs, it sets `pendo.pro.hideRC` to `true` and never attaches the listener.
- Known limitation of `_v2`: it only dismisses its own hidden tooltip guide on the run that attaches the listener. On later activations (the listener already exists, or no Resource Center was found), the code returns before `pendo.onGuideDismissed`, so the invisible tooltip stays active instead of being dismissed. Test repeated activation before relying on it.
- The `_v2` version and the badge snippet (`dismissRCWhenClickOutsideBadgeRC`) both use `pendo.pro.hideRC`, so don't run them together.
