// PRE-REQUISITES: This requires there to be an open text poll that contains
// the placeholder text "hidden box".  It will get hidden by the designer when
// the guide is previewed or is live.

var hiddenBox = pendo.dom('._pendo-open-text-poll-input[placeholder="hidden box"]');
if(!pendo.designerEnabled) {
  hiddenBox[0].parentElement.parentElement.parentElement.style.display = "none";
}

pendo.syncFields = function(event) {
    hiddenBox[0].innerText = pendo.dom("#datepicker")[0].value;
}
