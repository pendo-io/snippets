var textBoxQuestionText = "[hidden]";
var isTextBoxVisible = true;

// Pendo positions the guide based on its height when it first renders. Showing or
// hiding the text box changes that height, so re-run Pendo's positioning afterwards
// to keep "Relative to element" (and other) placements correct.
function repositionGuide() {
    var guideContainer = pendo.dom('#pendo-guide-container')[0];
    if (guideContainer) {
        pendo.flexElement(guideContainer);
    }
}

if(!pendo.designerEnabled) {
    pendo.dom('._pendo-row:has(._pendo-open-text-poll-wrapper)')[0].style.display = "none";
    var hiddenTextArea = pendo.dom('.bb-text:contains('+ textBoxQuestionText +')')[0];
    hiddenTextArea.style.display = "none";
    hiddenTextArea.setAttribute("hiddenTextArea", "true");
    hiddenTextArea.textContent = hiddenTextArea.textContent.replace("[hidden]", "").trim();
    isTextBoxVisible = false;

    for(var i=0; i < pendo.dom(".pendo-radio:contains('[showHidden]')").length; i++) {
        var elem = pendo.dom(".pendo-radio:contains('[showHidden]')")[i];
        elem.parentElement.setAttribute("showHidden", "true");
        elem.textContent=elem.textContent.replace("[showHidden]", "").trim();
    }

    repositionGuide();
}


for(var i=0; i < pendo.dom(".pendo-radio").length; i++) {
  // Loop through each element and attach a click event listener
  pendo.dom(".pendo-radio")[i].addEventListener('click', (e) => {
    if ((e.target.parentElement.getAttribute("showhidden") || e.target.getAttribute("showhidden")) && !isTextBoxVisible) {
        pendo.dom('._pendo-row:has(._pendo-open-text-poll-wrapper)')[0].style.display = "block";
        pendo.dom('[hiddenTextArea]')[0].style.display = "block";
        isTextBoxVisible = true;
        repositionGuide();
    } else if ((!e.target.parentElement.getAttribute("showhidden") && !e.target.getAttribute("showhidden")) && isTextBoxVisible) {
        pendo.dom('._pendo-row:has(._pendo-open-text-poll-wrapper)')[0].style.display = "none";
        pendo.dom('[hiddenTextArea]')[0].style.display = "none";
        pendo.dom('._pendo-open-text-poll-input')[0].value="";
        isTextBoxVisible = false;
        repositionGuide();
    }
  });
};

