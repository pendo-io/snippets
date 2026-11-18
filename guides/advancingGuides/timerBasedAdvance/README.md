# Timer-Based Advance

Shows a circular countdown timer in the guide and advances to the next step when the timer reaches zero. The visitor can click the timer to pause and resume it.

## Files

- `html.html`: HTML tab of a Custom Code Block on the step that should advance automatically.
- `css.css`: CSS tab of the same Custom Code Block.
- `js.js`: JS tab of the same Custom Code Block.

## Setup

1. Add a Custom Code Block to the step and paste each file into its matching tab.
2. Set `TIME_LIMIT` in `js.js` to the countdown length in seconds (default `10`).
3. Optionally change the colors in `css.css`: `#215D63` is used for the starting ring color (`.green`) and the play and pause icons; `.orange` and `.red` set the warning and alert colors.
4. Optionally adjust the timer position in `#timer-wrapper` (it is absolutely positioned in the bottom right corner and scaled to 75%).

## Notes

- The timer starts as soon as the step is shown and ticks once per second.
- The ring turns orange at half of `TIME_LIMIT` (`WARNING_THRESHOLD`) and red at one fifth of it (`ALERT_THRESHOLD`).
- Clicking anywhere on `#timer-wrapper` toggles between paused and running; the icon switches between the `pause` and `play` classes.
- The label shows the remaining time as minutes and seconds (for example `0:10`).
- The interval is cleared when the step is torn down, so the timer does not keep running after the visitor leaves the step.
- The element IDs `timer`, `timer-wrapper`, `pause`, `base-timer-label`, and `base-timer-path-remaining` are used by the JS; keep them in sync if you rename anything.
- Timer logic is credited to Mateusz Rybczonek (see the comment at the top of `js.js`).
