// Title: P2 Guides - Render, but hide guide until X
// The following should operate without error for any P2 guide type.

// Attribution to NB for providing the P1 JS code for this function
// WLH:  Updated and tested with P2 Guide Designer Lightbox and Tool Tip guides

function pendoHideGuide() {

  pendo._.each(pendo.Sizzle('div#pendo-guide-container'), function(guide) {
    guide.style.visibility = 'hidden';
  })

  pendo._.each(pendo.Sizzle('._pendo-backdrop_'), function(guide) {
    guide.style.visibility = 'hidden';
  })

  pendo._.each(pendo.Sizzle('div#pendo-base._pendo-guide-tt_'), function(guide) {
    guide.style.visibility = 'hidden';
  })
  
  pendo._.each(pendo.Sizzle('div.pendo-tooltip-caret'), function(guide) {
    guide.style.visibility = 'hidden';
  })
  
  pendo._.each(pendo.Sizzle('div.pendo-tooltip-caret-border'), function(guide) {
    guide.style.visibility = 'hidden';
  })

}

function pendoRevealGuide() {
  if (true) {
    pendo._.each(pendo.Sizzle('div#pendo-guide-container'), function(guide) {
      guide.style.visibility = '';
    })
    pendo._.each(pendo.Sizzle('._pendo-backdrop_'), function(guide) {
      guide.style.visibility = '';
    })
    pendo._.each(pendo.Sizzle('.div#pendo-base._pendo-guide-tt_'), function(guide) {
      guide.style.visibility = '';
    })
    pendo._.each(pendo.Sizzle('div.pendo-tooltip-caret-border'), function(guide) {
    guide.style.visibility = '';
    })
    pendo._.each(pendo.Sizzle('div.pendo-tooltip-caret'), function(guide) {
    guide.style.visibility = '';
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
setTimeout(function () {
  if (true) {
    pendoRevealGuide();
  }
}, 3000)
