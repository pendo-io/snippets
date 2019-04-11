function(step,guide){(function wireGuideAdvance (dom, step) {
    if (!step) return;
    var nextStep = guide.steps[guide.getPositionOfStep(step)];

    var advanceOnce = pendo._.once(pendo.onGuideAdvanced);


    function checkForElementAndAdvance (e) {
    	var checkForTableBody = setInterval(function () {
            if (dom(nextStep.elementPathRule).length) {
                advanceOnce();
                clearInterval(checkForTableBody);
            }
    	}, 1000);
    }

    pendo.attachEvent(document, 'click', checkForElementAndAdvance);

    // step wrappable method to clear all event listeners
    step.after('teardown', function () {
        pendo.detachEvent(document, 'click', checkForElementAndAdvance);
    });
})(pendo.dom, step);});
