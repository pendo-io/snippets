// PRE-REQUISITES: This requires there to be an open text poll that contains
// the placeholder text "hidden box".  It will get hidden by the designer when
// the guide is previewed or is live.

// This guide's own element. step.guideElement works for overlay and embedded guides; the fallback
// matches any container ID that starts with pendo-guide-container (embedded guides add a suffix).
var datepickerGuideRoot = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
var hiddenBox = [datepickerGuideRoot && datepickerGuideRoot.querySelector('._pendo-open-text-poll-input[placeholder="hidden box"]')];
if(!pendo.designerEnabled && hiddenBox[0]) {
  hiddenBox[0].parentElement.parentElement.parentElement.style.display = "none";
}

pendo.syncFields = function(event) {
    var datepicker = datepickerGuideRoot && datepickerGuideRoot.querySelector("#datepicker");
    if (hiddenBox[0] && datepicker) {
        hiddenBox[0].innerText = datepicker.value;
    }
}
