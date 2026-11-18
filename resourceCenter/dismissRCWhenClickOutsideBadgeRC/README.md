# Dismiss Resource Center on Outside Click (Badge Activation)

Closes the Pendo Resource Center when the visitor clicks anywhere outside of it. Use this when your Resource Center opens from the Pendo badge. It does not work if the Resource Center is activated by a target element; see `dismissRCWhenClickOutsideTargetElementRC` for that case.

## Files

- `dismissRCWhenClickOutsideBadgeRC.js`: goes in a Custom Code Block on a hidden tooltip guide that targets the Resource Center badge.

## Setup

1. Create a tooltip guide that targets the element `._pendo-resource-center-badge-container`.
2. Set the guide to display on Target Element, with "display on click" and "display every time".
3. Add a Custom Code Block to the guide and paste `dismissRCWhenClickOutsideBadgeRC.js` into its JS tab.
4. Add this line to the CSS tab of the same Custom Code Block so the tooltip itself never appears:

   ```css
   display: none !important;
   ```

5. Publish the guide.

## Notes

- Each time the guide runs, it dismisses itself and then toggles the Resource Center: it opens it if it is currently hidden, and closes it otherwise. The open or closed state is tracked in `pendo.pro.rcHidden`.
- `pendo.pro.rcHidden` starts as hidden even if another snippet created `pendo.pro` first, so the first badge click opens the Resource Center.
- A single document click listener is stored in `pendo.pro.hideRC` and attached only once. It closes the Resource Center when a click lands outside `#pendo-resource-center-container`, and it records clicks on `._pendo-resource-center-close-button` as a close.
- The code does nothing while the Pendo Designer is active (`pendo.designerEnabled`).
- This snippet and the `_v2` target element snippet both use `pendo.pro.hideRC`, so don't run them together.
