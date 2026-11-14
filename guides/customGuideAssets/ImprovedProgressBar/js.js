// Optional: fills the progress bar and the "Step X of Y" text automatically from this
// step's position in the guide, so you don't have to edit the HTML on every step.
(function (step, guide) {
  // This guide's own element (works for overlay and embedded guides)
  var guideRoot = (step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
  if (!guideRoot || !step || !guide) return;

  var position = guide.getPositionOfStep(step); // 1 for the first step
  var total = guide.steps.length;
  if (!position || !total) return;

  var bar = guideRoot.querySelector('.g-progress');
  if (bar) bar.style.setProperty('--progress', (position / total * 100) + '%');

  var label = guideRoot.querySelector('.right p');
  if (label) label.textContent = 'Step ' + position + ' of ' + total;
})(step, guide);
