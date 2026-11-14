(function (step, guide, dom) {
  // This guide's own element. step.guideElement works for overlay and embedded guides; the fallback
  // matches any container ID that starts with pendo-guide-container (embedded guides add a suffix).
  var guideRoot = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
  if (!guideRoot) return;

  //change color of stars when a selection is made
  Array.prototype.forEach.call(guideRoot.querySelectorAll('[id^="pendo-poll-choice"]'), function (choice) {
    choice.addEventListener('click', onStarClick);
  });

  function onStarClick(event) {
      var clickedPoll = event.target.closest("._pendo-number-scale-poll-wrapper");
      var starLabels = dom('label.pendo-radio[class*="_pendo-number-scale-poll-"]', clickedPoll);
      
      //remove fill class from all stars (to handle user changing rating after selection)
      for (let i = 0; i < starLabels.length; i++) {
          starLabels[i].classList.remove('star-filled')
      }
      //add fill class up until the selected star
      for (let i = 0; i < starLabels.length; i++) {
          starLabels[i].classList.add('star-filled')
          if (starLabels[i].previousSibling.checked) {
              break
          }
      }
  }
})(step, guide, pendo.dom)