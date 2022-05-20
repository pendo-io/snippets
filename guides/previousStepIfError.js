
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






//----------working but not optimized
// GoTo a specific step if no Element visible
(function goToStepNoElement() {
    if (!pendo.designerEnabled) {
        // The step of your guide you would like to go to when the element of the subsequent step isn't present
        var desiredStep = 5 //<--Step number as displayed in Pendo
        
        document.getElementById("pendo-guide-container").style.display = "none";

        /* If you must defer this to guide load time or if the element is not already visible
        pendo._.defer(function(){setTimeout(function checkElementAndSkip() {*/
        setTimeout(
            function checkElementAndSkip() {
                var results = pendo.Sizzle("#errDiv"); //errDiv
                if (results.length === 0 || !pendo._.some(results, pendo.isElementVisible)) {
                    pendo.log(guide.id + ':advance 1 step');
                    pendo.onGuideAdvanced();
                } else {
                    pendo.log(guide.id + ':advance to designated step');
                    
                    // Use the line below if you don't want to utilize the Step ID directly and would rather use the step count
                    pendo.goToStep({destinationStepId: pendo.getActiveGuide().guide.steps[desiredStep-3].id}); //this is taking the desired step number (this is 0 based) and subtracting 1 to get rid of the zero base and subracting 1 to go to this codeblockk step and subtracting another 1 to go back to step before the codeblock
                    pendo.goToStep({destinationStepId: pendo.getActiveGuide().guide.steps[previousStepNumber-1].id}); //previousStepNumber -1 because 0 based
                    
                    // Use the line below if you know the specific Step ID (generally a stronger reference)
                    //pendo.goToStep({destinationStepId: "N9d7QgG8ZxOBqeUmZr4dn92yltE"});  <-- Example Step ID
                }
            }
        , 1000)
    }
})();