// Title: Render, but hide guide until X
// The following should operate without error for any guide type.
// NB: Pendo Agent Guide system creates a guideSeen event on render. It is
//     possible to receive guideSeen events for guides never viewed by a Visitor
// NB: A hidden rendered guide will block other automatic guides from display.
//     Pendo Agent Guide system renders one automatic guide at a time.
// NB: Untested with click blocking.

function pendoHideGuide() {
  // Where appropriate (tooltip, banner) replace this with "visibility: hidden;"
  // in CSS tab.
  // NB: Use "visiblity" rather than "display" to hide due to auto-sizing logic.
  // NB: It will not look like correct syntax and syntax checking will show an
  //     error, but it will get scoped to the _pendo-guide_ class.
  pendo._.each(pendo.Sizzle('._pendo-guide_'), function(guide) {
    guide.style.visibility = 'hidden';
  })

  // Only required for Lightboxes. Only way to hide the backdrop per-guide.
  pendo._.each(pendo.Sizzle('._pendo-backdrop_'), function(guide) {
    guide.style.display = 'none';
  })
}

function pendoRevealGuide() {
  if (true) {
    pendo._.each(pendo.Sizzle('._pendo-guide_'), function(guide) {
      guide.style.visibility = '';
    })
    pendo._.each(pendo.Sizzle('._pendo-backdrop_'), function(guide) {
      guide.style.display = 'block';
    })
  }
}

// Hide guide immediately if not in Pendo Designer
if (!pendo.designer) {
  pendoHideGuide();
}
// If using CSS to hide a guide, reveal
else {
  pendoRevealGuide();
}

// EXAMPLE: reveal after 3 seconds. Remove timeout and set conditional check
setTimeout(function pendoRevealGuide() {
  if (true) {
    pendoRevealGuide();
  }
}, 3000)
