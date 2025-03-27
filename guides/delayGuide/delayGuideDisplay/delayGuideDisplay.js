// Pendo Pro: Delay Guide Step Based on Aria Label Seconds Value

(function(dom, _) {
    
  function parseInput(input) {
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
    
  function pendoHideGuide() {
    console.log('base: ', dom('#pendo-base'));
    _.each(dom('#pendo-base'), function(elm) {
      elm.style.display = "none";
    })
  }

  function pendoRevealGuide() {
    _.each(dom('#pendo-base'), function(elm) {
      elm.style.display = "block";
      window.dispatchEvent(new Event('resize'));
      pendo.flexElement(pendo.dom('#pendo-guide-container')[0]);
    })
  }

  // Hide guide immediately if not in Pendo Designer
  if (!pendo.designerEnabled) {
    pendoHideGuide();
  }

  // EXAMPLE: reveal after 3 seconds
  
    if(parseInput(pendo.dom("#pendo-guide-container")[0].ariaLabel)){
        setTimeout(function () {
            pendoRevealGuide();
        }, parseInput(pendo.dom("#pendo-guide-container")[0].ariaLabel)*1000)
    };
    

})(pendo.dom, pendo._);