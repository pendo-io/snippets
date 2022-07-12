
//NOTE: NEED TO ENSURE THIS STEP AND NEXT STEP'S TARGET ELEMENT IS EITHER SET TO NONE OR IS STILL VISIBLE
(function previousStepIfError() {
    if (!pendo.designerEnabled) { //preview/active guides will not show container, but you can still edit it when in the pendo designer
        //input unique .class or #id selector of the error div
        errorSelector = ".errorMessageBar"

        document.getElementById("pendo-guide-container").style.display = "none"; //preview/active guides will not show container, but you can still edit it when in the pendo designer
        
        // The step of your guide you would like to go to when the element of the subsequent step isn't present
        var previousStepNumber = guide.getPositionOfStep(step)-1
        //var thisStepNumber = guide.getPositionOfStep(step)
        //var nextStepNumber = guide.getPositionOfStep(step)+1

        setTimeout(
            function checkElementAndSkip() {
                var results = pendo.Sizzle(`${errorSelector}`); //errDiv
                if (results.length === 0 || !pendo._.some(results, pendo.isElementVisible)) {
                    pendo.log(guide.id + ':advance 1 step');
                    pendo.onGuideAdvanced();
                } else {
                    pendo.log(guide.id + ':advance to designated step');
                    pendo.goToStep({destinationStepId: pendo.getActiveGuide().guide.steps[previousStepNumber-1].id}); //previousStepNumber -1 because 0 based
                }
            }
        , 1000)
    }
})();
