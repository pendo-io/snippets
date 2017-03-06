(function wireHideOrDismiss(step) {
    step && step.attachEvent(step.guideElement[0], "click", function hideOrDismiss(e) {
            if (!checkClickTarget(e, ".pendo-close-button")) {
                if (pendo.Sizzle(".pendo-never-show-again")[0].checked) {
                    pendo.onGuideDismissed();
                } else {
                pendo.onGuideDismissed({until: "reload"});
            }
        }
    });

    function checkClickTarget (e, elem) {
        return pendo.dom(e.target || e.srcElement).closest(elem).length === 0;
    }
})(step, guide);
