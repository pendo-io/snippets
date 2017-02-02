(function wireGuideAdvanceButton(step) {
  // pendo.dom('._pendo-guide-next_')[0].disabled = true;
  step && step.attachEvent(step.guideElement[0], 'click', function(e) {
    var advanceButton = pendo.dom(e.target || e.srcElement).closest('._pendo-guide-next_');
    if (advanceButton.length) {
     if (checkEmpty()) {
      addPendoRequired();
     } else {
      checkInputValue(pendo.Sizzle(step.elementPathRule)[0]);
      pendo.onGuideAdvanced();
     }
   }
  });

   step && step.attachEvent(pendo.Sizzle(step.elementPathRule)[0], 'keydown', function(e) {
    checkTabPress(e);
   });

   step && step.attachEvent(pendo.Sizzle(step.elementPathRule)[0], 'keyup', function(e) {
    checkInputValue(e);
   });

   function checkEmpty() {
    return pendo.Sizzle(step.elementPathRule)[0].value.length === 0;
   }

   function checkInputValue(e) {
    if (!checkEmpty()) {
     removePendoRequired();
    } else {
     addPendoRequired();
    }
   }

   function addPendoRequired() {
    var requiredElement = document.getElementsByClassName('_pendo-required_');
    requiredElement[0].classList.remove('_pendo-hidden_');
    requiredElement[0].classList.add('_pendo-active_');
   }

   function removePendoRequired() {
     var requiredElement = document.getElementsByClassName('_pendo-required_');
     requiredElement[0].classList.remove('_pendo-active_');
     requiredElement[0].classList.add('_pendo-hidden_');
   }

   var checkTabPress = function checkTabPress(e) {
     if (e.keyCode === 9) {
        if (checkEmpty()) {
          addPendoRequired();
      } else {
        pendo.onGuideAdvanced();
      }
    }
  }
})(step, guide);
