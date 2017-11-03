// Prerequisites:
// One hidden banner step set to sitewide
// Subsequent step set to site wide to take visitor back to desired location
pendo._.defer(function (){
    // Skip to first step which matches current URL if step assigned to specific page
    var url = pendo.getCurrentUrl();
    var currentGuide = guide;
    if (!currentGuide) {return;}
    var steps = currentGuide.steps;
    // Ignore any steps which are sitewide
    var testSteps = pendo._.filter(pendo._.rest(steps), function(step){
        return step.pageId;
    });
    // TODO handle guide with all sitewide steps
    // Return step array index of first page regex match to current url
    var startingPoint = pendo._.indexOf(steps, pendo._.find(testSteps, function(step){
        return pendo.testUrlForStep(step.regexUrlRule, url);
    }));
    pendo.log(guide.id + ":startingPoint is "+startingPoint);
    // If no matches found
    if (startingPoint == -1) {
        pendo.onGuideAdvanced();
        return;
    }
    // Based on previous logic startingPoint should be > 0
    var prevStep = steps[startingPoint-1];
    pendo.log(guide.id + ':found starting step to be '+prevStep.id);
    pendo.onGuideAdvanced(prevStep);
}, 1);
