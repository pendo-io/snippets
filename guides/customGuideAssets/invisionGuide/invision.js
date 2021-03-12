(function wireGuideAdvanceButton (step) {
    step && step.attachEvent(step.guideElement[0], 'click', function (e) {
        var advanceButton = pendo.dom(e.target || e.srcElement).closest('._pendo-guide-next_');
        if (advanceButton.length) {
            pendo.onGuideAdvanced();
        }
    });
})(step,guide);
