var logicCheckTimeoutAmmountInMilliseconds = 750; //set as 0 if no delay is required
var skippedNumberOfSteps = 1 //Number needs to be 1 or greater.


if(!pendo.designerEnabled){
    var guideContainer = pendo.dom(`#pendo-guide-container`)[0].style.display = "none";
    var guideBackdrop = pendo.dom(`#pendo-backdrop`)[0].style.display = "none";
}

setTimeout(()=>{skipStepsNoElement()},logicCheckTimeoutAmmountInMilliseconds)

function skipStepsNoElement() {
    if(!pendo.designerEnabled){
        var guidePayload = pendo.getActiveGuide();
        var currentStepIndex = Number(guidePayload.stepIndex);
        var guideSteps = guidePayload.guide.steps;
        var nextStepPayload = guideSteps[currentStepIndex + 1];
        var nextStepId = guideSteps[currentStepIndex + 1].id;
        if(guideSteps[currentStepIndex + 1 + skippedNumberOfSteps]){
            var skipToStepId = guideSteps[currentStepIndex + 1 + skippedNumberOfSteps].id;
        }

        (function checkElementAndSkip() {
            var results = pendo.Sizzle(nextStepPayload.elementPathRule);
            if (results.length === 0 || !pendo._.some(results, pendo.isElementVisible)) {
                if(skipToStepId){
                    pendo.log(guide.id + `:advance ${1 + skippedNumberOfSteps} steps`);
                    pendo.goToStep({destinationStepId: skipToStepId});
                } else{
                    pendo.log(`skipStepNoElement did not find any remaining guide steps. dismissing guide.`)
                    pendo.onGuideDismissed()
                }
                
            } else {
                pendo.log(guide.id + ':advance 1 step');
                pendo.goToStep({destinationStepId: nextStepId});
            }
        })();
    }
};
