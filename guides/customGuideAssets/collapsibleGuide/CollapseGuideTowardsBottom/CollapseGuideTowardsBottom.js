// This customization is designed to let the guide container "collapse" and move down below the fold and out of the way.
// It works best with content-heavy guides that the user can reference when they need to and collapse when they want to access the application UI behind the guide.
// The collapsed state is saved in sessionStorage so that when users navigate between pages, the guide will stay collapsed or expanded.

(function (dom) {
    var offset = '215px' // ***EDIT THIS VALUE BASED ON HOW FAR DOWN THE GUIDE NEEDS TO MOVE***
    var collapseHtml = `<div class="pendo-expand-collapse-button"><span class="pendo-expand-collapse-arrow"></span></div>`;
    var collapseButton = document.createElement("div");
    collapseButton.innerHTML = collapseHtml;
    var guideContainer = document.getElementById("pendo-guide-container");
    guideContainer.appendChild(collapseButton);
  
  // Check sessionStorage for initial collapse state
  if (sessionStorage.pendoCollapseStatus === "collapse") {
    guideContainer.style.top = offset;
    guideContainer.classList.add("collapse");
  }
  
  // Toggle collapse/expand state on button click
  dom(".pendo-expand-collapse-button").on("click", function () {
    if (sessionStorage.pendoCollapseStatus === "collapse") {
      guideContainer.style.top = "0px";
      guideContainer.classList.remove("collapse");
      sessionStorage.pendoCollapseStatus = "expand";
    } else {
      guideContainer.style.top = offset;
      guideContainer.classList.add("collapse");
      sessionStorage.pendoCollapseStatus = "collapse";
    }
  });
  })(pendo.dom);