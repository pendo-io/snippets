(function wireNextGuideButton(step) {
    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
        
        // use 1 or more button of same category like primary buttons in your guides then use the unique id of the targeted button to trigger the dynamic permalink
        // if you just have 1 primary button then you can directly using the button class.
        var advanceButton_1 = pendo.dom(e.target || e.srcElement).closest('#pendo-button-b3b263d3');
        if (advanceButton_1.length) {

            // get the text value of the fetched metadata to be used ahead.
            var account_name = document.getElementsByClassName("_pendo-hidden-account_")[0].innerHTML

            // build your URL by using the variable above.
            var newurl = "https://" + account_name + ".app.com/settings/manage?pendo=guide_id"
            
            //Finally dismissing the current guide to trigger the permalink.
            pendo.onGuideDismissed();

            // Opening the dynamic permalink url in the same browser tab.
            window.open(newurl, "_self");
        }
