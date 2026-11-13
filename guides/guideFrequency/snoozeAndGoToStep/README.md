# Snooze & Go To Step

This will execute a snooze and a go to step simultaneously on the click of an existing Pendo Guide button.  You can add any kind of button you'd like, as the first lines of this code will strip the existing event listeners.

Video of this in action can be found [here](https://pendo.zoom.us/rec/play/iIYheTspF78Dx3HHEo9p-KkBR8PGX3swaVDkyDlcKGN5MSed3Spbicea_ek2Kl6ryUCLJLIrehjMrALN.1sHwkClQVRwtDVRs?continueMode=true&_x_zm_rtaid=tujhBB9DQbSOrHNB-zKwvw.1628787392628.2fba522066afe54adfe02921e1b56905&_x_zm_rhtaid=307).

## Before you use it

- **Replace the button ID.** The snippet targets `#pendo-button-f5370b99`, which is a button from the example guide. Replace every occurrence with the ID of the button in your own guide (inspect the button in your browser to find it). If you don't, the snippet does nothing.
- **Set `desiredStepNumber`.** This is the step the guide returns to, counting from 1. The default of `1` sends the user back to the first step, not forward to the next one.
- **Set `howLongToSnooze`.** This is in milliseconds (`15000` is 15 seconds).

## Known limitation: no visible pause

Both listeners run on the same click, so `goToStep` displays the destination step straight away. It does **not** add a timed pause before the next step appears. If you need a delay before a step is shown, see [Delaying a Guide Step](../../delayGuide).
