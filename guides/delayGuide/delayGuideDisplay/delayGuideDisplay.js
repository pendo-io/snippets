// Title: P2 Guides - Render, but hide guide until X
// The following should operate without error for any P2 guide type.

// Attribution to NB for providing the P1 JS code for this function
// WLH:  Updated and tested with P2 Guide Designer Lightbox and Tool Tip guides
(function(dom, _) {

  function pendoHideGuide() {
    console.log('base: ', dom('#pendo-base'));
    _.each(dom('#pendo-base'), function(elm) {
      elm.style.display = "none";
    })
  }

  function pendoRevealGuide() {
    _.each(dom('#pendo-base'), function(elm) {
      elm.style.display = "";
    })
  }

  // Hide guide immediately if not in Pendo Designer
  if (!pendo.designerEnabled) {
    pendoHideGuide();
  }

  // EXAMPLE: reveal after 3 seconds
  setTimeout(function () {
    pendoRevealGuide();
  }, 3000)

})(pendo.dom, pendo._);