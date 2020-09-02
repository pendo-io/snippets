// Adapted from https://gist.github.com/jaydson/1780598
(function advanceGuideOnClickInIframe(dom) {
  var iframe = document.querySelector('YOUR_IFRAME_SELECTOR');

  // Local state
  var isMouseOverIframe = false;

  // Name functions so we can remove event listeners on teardown
  function setMouseOverIframe() { isMouseOverIframe = true };
  function setMouseOutOfIframe() { isMouseOverIframe = false };
  function advanceGuideIfMouseOverIframe() { 
    if (isMouseOverIframe) {
      pendo.onGuideAdvanced();
    }
  };

  // Update state so we know if user's mouse is over the iframe
  pendo.attachEvent(iframe, 'mouseover', setMouseOverIframe);
  pendo.attachEvent(iframe, 'mouseout', setMouseOutOfIframe);

  // When a separate window is focused, check if that window is the iframe in 
  // question and if so advance the guide
  pendo.attachEvent(window, 'blur', advanceGuideIfMouseOverIframe);

  // Remove event listeners upon leaving this guide step
  step.after('teardown', function () {
    pendo.detachEvent(iframe, 'mouseover', setMouseOverIframe);
    pendo.detachEvent(iframe, 'mouseout', setMouseOutOfIframe);
    pendo.detachEvent(iframe, 'blur', advanceGuideIfMouseOverIframe);
  });
})(pendo.dom);
