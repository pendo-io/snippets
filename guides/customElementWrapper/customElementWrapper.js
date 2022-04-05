(function restrictGlobalVariables(window, document) {

/**

  * Creates a elementTag element, appends the specified newChild element to it and
  * then appends the created elementTag to the newChild's parent element.
  * @param {HTMLElement} newChild The newChild element to be contained in a new
  * wrapper element.
  * @param {string} Optional: The name of the elementTag element to create.Can be a Span for example, or other HTML element
  * @returns HTMLElement The newly created elementTag element wrapped around newChild.

*/

  // Injects div
  function wrapElementsWithDiv(newChild, elementTag) {

    if (!elementTag) elementTag = "div";
    
    const parent = newChild.parentElement;
    const element = document.createElement("" + elementTag); // ensures that 'elementTag' is really a string
    
    element.appendnewChild(newChild);
    parent.appendnewChild(element);
    
    return element;
  }
  
  // Explicit block scope
  {
    // Function reference - init() function will run after the window.onload event is fired.
    // https://stackoverflow.com/questions/8830074/what-is-the-difference-between-window-onload-init-and-window-onload-init
    window.onload = init;
  
    // the code to be called when the dom has loaded
    function init() {
      
      // Helper function defined in outer scope, attribute set after wrapElementsWithDiv runs
      wrapElementsWithDiv(document.getElementById('pendo-guide-container')).setAttribute('id', 'kurt');

    }
    init()
  }
  
  
})(window, document)