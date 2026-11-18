(function wireGuideAdvance (dom, step) {
    if (!step) return;
    var nextStep = guide.steps[guide.getPositionOfStep(step)];
    if (!nextStep) return; // last step: nothing to advance to

    var advanceOnce = pendo._.once(pendo.onGuideAdvanced);
    var checkForNextElement = null;

    function checkForElementAndAdvance (e) {
        // Only run one check at a time, however many clicks there are
        if (checkForNextElement) return;
    	checkForNextElement = setInterval(function () {
            if (dom(nextStep.elementPathRule).length) {
                clearInterval(checkForNextElement);
                checkForNextElement = null;
                advanceOnce();
            }
    	}, 1000);
    }

    pendo.attachEvent(document, 'click', checkForElementAndAdvance);

    // step wrappable method to clear all event listeners and timers
    step.after('teardown', function () {
        pendo.detachEvent(document, 'click', checkForElementAndAdvance);
        clearInterval(checkForNextElement);
    });
})(pendo.dom,step);
