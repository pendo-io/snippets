// Skip step if no Element visible
(function skipStepNoElement() {
    // Warning: .getPositionOfStep() is 1-based
    var nextStep = guide.steps[guide.getPositionOfStep(step)];
    /* If you must defer this to guide load time or if the element is not already visable
    pendo._.defer(function(){setTimeout(function checkElementAndSkip() {*/
    (function checkElementAndSkip() {
        var results = pendo.Sizzle(nextStep.elementPathRule);
        if (results.length === 0 || !pendo._.some(results, pendo.isElementVisible)) {
            pendo.log(guide.id + ':advance 2 steps');
            pendo.onGuideAdvanced(nextStep);
        } else {
          pendo.log(guide.id + ':advance 1 step');
          pendo.onGuideAdvanced();
        }
    })();
})();
