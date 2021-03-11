// leverave bootstrap 'modal-open' class to prevent body scrolling when guide is showing
if (pendo.isGuideShown()) {
    pendo.dom('body').addClass('modal-open')
} else {
    pendo.dom('body').removeClass('modal-open')
}

(function wireGuideAdvanceButton (step) {
    step && step.attachEvent(step.guideElement[0], 'click', function (e) {
        var advanceButton = pendo.dom(e.target || e.srcElement).closest('._pendo-guide-next_');
        if (advanceButton.length) {
            pendo.onGuideAdvanced();
        }
    });
})(step,guide);
