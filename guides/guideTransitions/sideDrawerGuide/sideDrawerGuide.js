var el = document.querySelector('.app-container'); // ← UPDATE: page wrapper selector for this page
var GUIDE_ID = 'pendo-g-31Rr5I1QkpqdJzVCUPlt9S1NUNo'; // ← UPDATE: DOM element ID of this blade guide
var isOpen = false;

function restore() {
  if (!isOpen) return;
  isOpen = false;
  el.style.transition = 'margin-right 0.3s ease';
  el.style.marginRight = '';
  document.removeEventListener('click', handleClick, true);
}

function closeAndRestore() {
     if (typeof pendo !== 'undefined' && typeof pendo.onGuideDismissed === 'function') {
     pendo.onGuideDismissed();
   } else {
     var guideEl = document.getElementById(GUIDE_ID);
     if (guideEl) guideEl.remove();
   }
  restore();
}

function handleClick(e) {
  var guideEl = document.getElementById(GUIDE_ID);
  if (!guideEl) return;

  if (e.target.id === 'pendo-close-guide-4deb3b95') { // ← UPDATE: close button ID of this blade guide
    closeAndRestore();
    return;
  }

  var anchor = e.target.closest('a[href]');
  if (anchor) {
    var href = anchor.getAttribute('href');
    var isHashOnly = href && href.startsWith('#');
    var isExternal = anchor.target === '_blank';
    if (!isHashOnly && !isExternal) {
      closeAndRestore();
      return;
    }
  }

  if (!guideEl.contains(e.target)) {
    closeAndRestore();
  }
}

setTimeout(function() {
  el.style.transition = 'margin-right 0.3s ease';
  el.style.marginRight = '650px';
  isOpen = true;
  document.addEventListener('click', handleClick, true);
}, 100);

this.unmounted = restore;
