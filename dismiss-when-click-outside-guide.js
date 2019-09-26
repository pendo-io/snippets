// Note: only tested for P2 lightbox.
var closeGuideOnOutsideClick = function(event) {
  var targetPath = event.path;

  var result = pendo._.any(targetPath, function (ele) {
    return ele.id ? ele.id.includes('pendo-guide-container') : false;
  });

  if (!result) {
    removeEventListener();
    pendo.onGuideDismissed();
  }
};

var removeEventListener = function() {
  document.getElementsByTagName('body')[0].removeEventListener('click', closeGuideOnOutsideClick)
};

document.getElementsByTagName('body')[0].addEventListener('click', closeGuideOnOutsideClick);
