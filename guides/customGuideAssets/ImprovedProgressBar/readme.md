# Custom Progress Bar

A thin gradient progress bar with a "Step X of Y" label for multi-step guides.

## Files

- `html.html`: HTML tab of a Custom Code Block.
- `css.css`: CSS tab of the same Custom Code Block.
- `js.js`: JS tab of the same Custom Code Block (optional, see below).

## Setup

Create a new guide, add a Custom Code Block with the files above, and save the step. Then duplicate this first step for every other step in the guide.

With `js.js`, the bar and the label are filled in automatically from each step's position (step 2 of 6 shows 33.33% and "Step 2 of 6"), so you don't need to edit anything per step.

Without `js.js`, set the progress by hand on each step: change `--progress` in the first line of the HTML and the text "Step 1 of 5" on line 3. For example, a guide with 6 steps increments by 16.66% per step:

First step - 16.66%
Second step - 33.33% and so on.

## Notes

- The automatic version counts every step in the guide, including any hidden or invisible steps.
- The bar uses the CSS `@property` rule to animate `--progress`; browsers without `@property` support still show the bar, without the animation.
