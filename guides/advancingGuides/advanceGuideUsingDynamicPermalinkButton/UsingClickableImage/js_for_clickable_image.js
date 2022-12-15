(function wireNextGuideButton(step) {
    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
        
        // get the first clickable image in the guide.
        var advanceButton = pendo.dom(e.target || e.srcElement).closest('.opt1');

        if (advanceButton.length) {
            // get the text value from the metadata to be used ahead in the URL.
            var account_name = document.getElementsByClassName("_pendo-hidden-account_")[0].innerHTML

            // build your URL by using the HTML variable above.
            var newurl = "https://" + account_name + ".app.com/settings/manage?pendo=guide_id";

            // Use pendo.validateInstall() in the Developer Console to check what metadata being currently sent via the Pendo agent.
            // Use ${pendo.accountId} to provide the Account ID value
            // Use ${pendo.getSerializedMetadata().visitor.metadataname} to get the value of a visitor level metadata field. Replace 'metadataname' with the name of the metadata field.
            // Use ${pendo.getSerializedMetadata().account.metadataname} to get the value of an account level metadata field

            // build your URL by using the account name metadata directly.
            // var newurl = "https://" + ${pendo.getSerializedMetadata().account.name} + ".app.com/settings/manage?pendo=guide_id"

            //Finally dismissing the current guide to trigger the permalink.
            pendo.onGuideDismissed();

            // Opening the dynamic permalink url in the same browser tab after refreshing the page.
            window.open(newurl, "_self");
        }
    });
})(step, guide);
