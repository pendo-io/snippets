//This is designed to work with a bottom-aligned banner guide with a header section at the top which will remain visible when the guide collapses
//You could also collapse the guide all the way so that only the collapse button remains visible at the bottom of the page. The amount that the guide collapses (moves down) is controlled by the “offset” variable
//The collapsed state is saved in sessionStorage so that when users navigate between pages, the guide will stay collapsed or expanded

var offset = '276px' //edit this value based on the height of your guide minus the height of the header you want to remain visible

(function (dom) {
  //create collapse/expand button with arrow inside
  var collapseHtml = `<div class="pendo-expand-collapse-button"><span class="pendo-expand-collapse-arrow"></span></div>`;
  var collapseButton = document.createElement("div");
  collapseButton.innerHTML = collapseHtml;
  var guideContainer = document.getElementById("pendo-guide-container");
  guideContainer.appendChild(collapseButton);

  //check sessionStorage for initial collapse state
  if (sessionStorage.pendoFTUstatus === "collapse") {
    guideContainer.style.top = offset;
    guideContainer.classList.add("collapse");
  }

  //toggle collapse/expand state on button click
  dom(".pendo-expand-collapse-button").on("click", function () {
    if (sessionStorage.pendoFTUstatus === "collapse") {
      guideContainer.style.top = "0px";
      guideContainer.classList.remove("collapse");
      sessionStorage.pendoFTUstatus = "expand";
    } else {
      guideContainer.style.top = offset;
      guideContainer.classList.add("collapse");
      sessionStorage.pendoFTUstatus = "collapse";
    }
  });
})(pendo.dom);
