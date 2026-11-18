if(!pendo.designerEnabled) {
    // This guide's container (embedded guides use a suffixed id, so match by prefix)
    var npsGuideRoot = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document;
    var npsContainer = npsGuideRoot.querySelector('[id^="pendo-guide-container"]');
    var npsUpperLabel = npsGuideRoot.querySelector("._pendo-nps-poll-upperbound-label");
    var npsTextInput = npsGuideRoot.querySelector("._pendo-nps-open-text-poll-input");

    // Each change applies only if that element exists on this step
    if (npsContainer && npsContainer.parentElement) npsContainer.parentElement.style.height = "";
    if (npsUpperLabel) npsUpperLabel.style.display = "contents";
    if (npsTextInput) npsTextInput.style.width = "100%";
}
