// Pendo Pro: Delay Guide Step Based on Aria Label Seconds Value

(function(dom, _) {
    
  function parseInput(input) {
  if (typeof input !== 'string') {
    console.error("Error: No aria label found. Please set the guide step's aria label to '{delay: seconds}'.");
    return null;
  }
  // Remove any spaces around the input string and parse it into an object
  const trimmedInput = input.trim();
  if (trimmedInput[0] === '{' && trimmedInput[trimmedInput.length - 1] === '}') {
    // Remove the curly braces and split the content by the colon
    const content = trimmedInput.slice(1, trimmedInput.length - 1);
    const [key, value] = content.split(':').map(item => item.trim());

    // Check if the key is 'delay'
    if (key === "delay") {
      // Try to parse the value as an integer
      const parsedValue = parseInt(value, 10);

      // If the value is a valid integer, return it; otherwise, handle the error gracefully
      if (!isNaN(parsedValue)) {
        return parsedValue;
      } else {
        console.error("Error: The value is not a valid integer.");
        return null; // Gracefully handle non-integer values
      }
    } else {
      console.error("Error: The key is not 'delay'.");
      return null; // Handle the case where the key isn't 'delay'
    }
  } else {
    console.error("Error: Invalid input format. Please use the format '{key: value}'.");
    return null; // Handle invalid input format
  }
}
    
  // When a guide renders, Pendo sets aria-hidden="true" on the other top-level
  // elements of <body>. While the guide itself is hidden, that would leave the
  // whole page invisible to screen readers, so we lift aria-hidden for the
  // duration of the delay and put it back when the guide is revealed.
  var ariaHiddenElements = [];

  function releaseAriaHidden() {
    _.each(document.body.children, function(elm) {
      if (elm.getAttribute('aria-hidden') === 'true' && !elm.querySelector('#pendo-base') && elm.id !== 'pendo-base') {
        elm.removeAttribute('aria-hidden');
        ariaHiddenElements.push(elm);
      }
    });
  }

  function restoreAriaHidden() {
    _.each(ariaHiddenElements, function(elm) {
      elm.setAttribute('aria-hidden', 'true');
    });
    ariaHiddenElements = [];
  }

  function pendoHideGuide() {
    _.each(dom('#pendo-base'), function(elm) {
      elm.style.display = "none";
    });
    releaseAriaHidden();
    // Pendo may apply aria-hidden just after the code block runs, so check again
    setTimeout(releaseAriaHidden, 0);
  }

  function pendoRevealGuide() {
    _.each(dom('#pendo-base'), function(elm) {
      elm.style.display = "block";
    });
    restoreAriaHidden();
    window.dispatchEvent(new Event('resize'));
    pendo.flexElement(pendo.dom('#pendo-guide-container')[0]);
  }

  // Read the delay (in seconds) from the guide step's aria label, e.g. {delay: 3}.
  // Only hide the guide if there is a valid, positive delay to wait for;
  // otherwise it would stay hidden forever.
  var guideContainer = pendo.dom("#pendo-guide-container")[0];
  var delaySeconds = guideContainer ? parseInput(guideContainer.ariaLabel) : null;

  if (!pendo.designerEnabled && delaySeconds > 0) {
    pendoHideGuide();
    setTimeout(pendoRevealGuide, delaySeconds * 1000);
  }

})(pendo.dom, pendo._);