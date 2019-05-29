
(function advance(step, dom) {
    var location = pendo.getCurrentUrl();
    console.log('step 1 - location: ' + location);
    
    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
        var nextButton = pendo.dom(e.target || e.srcElement).closest('._pendo-button');
        
        if (nextButton.length) {
            console.log("next button");
			console.log('clicked next button at ' + location);
            if (location == "insert URL of the next step of the Guide" || location == "(url #2, may need to include http and https)" ){
            }  else {
                window.location.href = "insert URL where the next step displays";
            }
           
        } 
        
    });
})(step, pendo.dom);
