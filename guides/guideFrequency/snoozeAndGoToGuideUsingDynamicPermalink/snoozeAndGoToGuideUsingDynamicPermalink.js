(function wireNextGuideOnSnoozeButton(step) {
    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
        
        // use 1 or more button of same category like primary buttons in your guides then use the unique id of the targeted
        // button you want to trigger the dynamic permalink, if you just have 1 primary button
        // then you can directly using the button class.
        var advanceButton = pendo.dom(e.target || e.srcElement).closest('#pendo-button-8b36dabc');
        if (advanceButton.length) {

            // get the account name metadata value to be used ahead in the URL using pendo.getSerializedMetadata.
            var account_name = pendo.getSerializedMetadata().account.name;

            // build your URL by using the variable above.
            var newurl = "https://" + account_name + ".app.com/?pendo=<add the guide id you want to trigger after the current guide is snoozed>"

            // Opening the dynamic permalink url in the same browser tab.
            window.open(newurl, "_self");

            //
        }
    });
})(step, guide);