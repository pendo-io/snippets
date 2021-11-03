(function (step, guide, dom) {
  //change color of stars when a selection is made
  dom('[id^="pendo-poll-choice"]').on('click', function () {
      var starLabels = dom('label.pendo-radio[class*="_pendo-number-scale-poll-"]')
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
    });
})(step, guide, pendo.dom)