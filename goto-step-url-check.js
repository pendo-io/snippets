// GoTo a specific step if URL path matches
(function goToStepNoElement() {
    // Warning: .getPositionOfStep() is 1-based
    var nextStep = guide.steps[guide.getPositionOfStep(step)];

    // Enter the path of the URL after the domain/subdomain, first slash included
    var properUrl = "/demo_site/integrations.html";
    // The step of your guide you would like to go to when the URL path matches
    var desiredStep = 3; //<--Step number as displayed in Pendo

    /* If you must defer this to guide load time or if the element is not already visible
    pendo._.defer(function(){setTimeout(function checkUrlAndSkip() {*/
    (function checkUrlAndSkip() {
        var results = window.location.pathname;
        //console.log(results + " -- " + properUrl);  //For validating matches in the console
        if (results === properUrl) {
            pendo.log(guide.id + ':advance to designated step');
            // Use the line below if you don't want to utilize the Step ID directly and would rather use the step count
            pendo.goToStep({destinationStepId: pendo.getActiveGuide().guide.steps[desiredStep-1].id});
            // Use the line below if you know the specific Step ID (generally a stronger reference)
            //pendo.goToStep({destinationStepId: "N9d7QgG8ZxOBqeUmZr4dn92yltE"});  <-- Example Step ID
        } else {
          pendo.log(guide.id + ':advance 1 step');
          pendo.onGuideAdvanced();
        }
    })();
})();
