(function wireNextGuideButton(step) {
    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
        
        // use 1 or more button of same category like primary buttons in your guides then use the unique id of the targeted button to trigger the dynamic permalink
        // if you just have 1 primary button then you can directly using the button class.
        var advanceButton_1 = pendo.dom(e.target || e.srcElement).closest('#pendo-button-b3b263d3');
        
        if (advanceButton_1.length) {

            // get the text value of the fetched metadata from the HTML to be used ahead.
            var account_name = document.getElementsByClassName("_pendo-hidden-account_")[0].innerHTML;

            // build your URL by using the HTML variable above.
            var newurl = "https://" + account_name + ".app.com/settings/manage?pendo=guide_id";

            // Use pendo.validateInstall() in the Developer Console to check what metadata being currently sent via the Pendo agent.
            // Use ${pendo.accountId} to provide the Account ID value.
            // Use ${pendo.getSerializedMetadata().visitor.metadataname} to get the value of a visitor level metadata field. Replace 'metadataname' with the name of the metadata field.
            // Use ${pendo.getSerializedMetadata().account.metadataname} to get the value of an account level metadata field

            // build your URL by using the account name metadata directly.
            // var newurl = "https://" + ${pendo.getSerializedMetadata().account.name} + ".app.com/settings/manage?pendo=guide_id";
            
            //Finally dismissing the current guide to trigger the permalink.
            pendo.onGuideDismissed();

            // Opening the dynamic permalink url in the same browser tab.
            window.open(newurl, "_self");
        }
    });
})(step, guide);
