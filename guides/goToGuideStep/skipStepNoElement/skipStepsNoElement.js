(function skipStepNoElement() {
    var logicCheckTimeoutAmmountInMilliseconds = 1500; //set as 0 if no delay is required
    var skippedNumberOfSteps = 1; //Number needs to be 1 or greater.

    var logicCheckTimer = setTimeout(skipStepsNoElementLogic, Number(logicCheckTimeoutAmmountInMilliseconds));
    function skipStepsNoElementLogic() {
        if (!pendo.designerEnabled) {
            pendo.log(`skipStepsNoElement function start main logic`);
            var guidePayload = pendo.getActiveGuide();
            var currentStepIndex = Number(guidePayload.stepIndex);
            var guideSteps = guidePayload.guide.steps;
            var nextStepPayload = guideSteps[currentStepIndex + 1];
            if (!nextStepPayload) return; // last step: there is no next step to check
            var nextStepId = nextStepPayload.id;
            if (guideSteps[currentStepIndex + 1 + skippedNumberOfSteps]) {
                var skipToStepId = guideSteps[currentStepIndex + 1 + skippedNumberOfSteps].id;
            }

            (function checkElementAndSkip() {
                pendo.log(`skipStepsNoElement starting checkElementAndSkip function`);
                var results = pendo.Sizzle(nextStepPayload.elementPathRule);
                if (results.length === 0 || !pendo._.some(results, pendo.isElementVisible)) {
                    if (skipToStepId) {
                        pendo.log(guide.id + `:advance ${1 + skippedNumberOfSteps} steps`);
                        pendo.goToStep({ destinationStepId: skipToStepId });
                    } else {
                        pendo.log(`skipStepNoElement did not find any remaining guide steps. dismissing guide.`);
                        pendo.onGuideDismissed();
                    }

                } else {
                    pendo.log(guide.id + ':advance 1 step');
                    pendo.goToStep({ destinationStepId: nextStepId });
                }
            })();
        }
    };

    var invisibleStepStylingFixTimeoutAmmountInMilliseconds = 1;
    var stylingFixTimer = setTimeout(invisibleStepStylingFix, Number(invisibleStepStylingFixTimeoutAmmountInMilliseconds));
    function invisibleStepStylingFix() {
        if (!pendo.designerEnabled) {
            if (pendo.dom(`#pendo-guide-container`)[0]) {
                if (pendo._.has(pendo.dom(`#pendo-guide-container`)[0].style, "display")) {
                    pendo.dom(`#pendo-guide-container`)[0].style.display = "none";
                }
            }
            if (pendo.dom(`#pendo-backdrop`)[0]) {
                if (pendo._.has(pendo.dom(`#pendo-backdrop`)[0].style, "display")) {
                    pendo.dom(`#pendo-backdrop`)[0].style.display = "none";
                }
            }
            pendo.log(`invisible step styling fixed (guide container display removed & backdrop display removed for invisible step)`)
        }
    }

    // If this step closes before the timers fire, cancel them so they can't
    // advance, dismiss, or restyle a different guide that is active by then
    if (typeof step !== 'undefined' && step && step.after) {
        step.after('teardown', function () {
            clearTimeout(logicCheckTimer);
            clearTimeout(stylingFixTimer);
        });
    }
})();
