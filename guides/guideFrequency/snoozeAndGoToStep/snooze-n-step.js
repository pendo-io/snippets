//Strips existing event listeners
pendo.dom("#pendo-button-f5370b99")[0].outerHTML = pendo.dom("#pendo-button-f5370b99")[0].outerHTML;

//Insert the number of the step you want to return to on line 5.
var desiredStepNumber = 1;
var desiredStep = pendo.getActiveGuide().guide.steps[desiredStepNumber-1];

//Adds an eventListener to snooze the guide.  Change the amount of time to snooze on line 10
pendo.dom('#pendo-button-f5370b99')[0].addEventListener("click", function () {
    var howLongToSnooze = Number(15000) // 15 seconds
    pendo.onGuideSnoozed("guideSnoozed", desiredStep, howLongToSnooze);
});

//Adds a simultaneous eventListener to go back to the desired step.
pendo.dom('#pendo-button-f5370b99')[0].addEventListener("click", function () {
    	pendo.goToStep({destinationStepId: desiredStep.id});
});