(function wireNextGuideButton(step) {
    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
        
        // use 1 or more button of same category like primary buttons in your guides then use the unique id of the targeted button to trigger the dynamic permalink
        // if you just have 1 primary button then you can directly using the button class.
        var advanceButton_1 = pendo.dom(e.target || e.srcElement).closest('#pendo-button-b3b263d3');
        
        if (advanceButton_1.length) {
            /* 
            
            ** Preferred Method 1 **
            We can use pendo.getSerializedMetadata to get metadata values that are being sent via the Pendo agent.
            
            This is easier to implement as you dont have to use the css.css to hide these values and have less code
            in html_for_clackable_iamge.html file, check instructions in both files about using these methods.
            
            Example:-
            Use ${pendo.accountId} to provide the Account ID value
            Use ${pendo.getSerializedMetadata().visitor.metadataname} to get the value of a visitor level metadata field. Replace 'metadataname' with the name of the metadata field.
            Use ${pendo.getSerializedMetadata().account.metadataname} to get the value of an account level metadata field
            
            */

            // get the account name metadata value to be used ahead in the URL using pendo.getSerializedMetadata.
            var account_name = pendo.getSerializedMetadata().account.name;

            // build your URL by using the account name metadata directly.
            var newurl = "https://" + account_name + ".app.com/settings/manage?pendo=guide_id"

            /*-----------------------------------------------------------------------------------------------------*/

            // ** Method 2 **
            // This method is a bit complex but can be used if you want to get metadata or any other value from the guide HTML directly.
            
            // Uncomment the below line to get the text value from the metadata to be used ahead in the URL.
            // var account_name = document.getElementsByClassName("_pendo-hidden-account_")[0].innerHTML

            // Uncomment the below line to build your URL by using the HTML variable above.
            // var newurl = "https://" + account_name + ".app.com/settings/manage?pendo=guide_id";

            //Finally dismissing the current guide to trigger the permalink.
            pendo.onGuideDismissed();

            // Opening the dynamic permalink url in the same browser tab after refreshing the page.
            window.open(newurl, "_self");
        }
    });
})(step, guide);
