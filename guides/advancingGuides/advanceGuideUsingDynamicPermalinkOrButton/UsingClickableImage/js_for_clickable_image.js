(function wireNextGuideButton(step) {
    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
        
        // get the first clickable image in the guide.
        var advanceButton = pendo.dom(e.target || e.srcElement).closest('.opt1');

        if (advanceButton.length) {
            /* 
            
            ** Preferred Method 1 **
            We can use pendo.getSerializedMetadata to get metadata values that are being sent via the Pendo agent.
            
            This is easier to implement as you dont have to use the css.css to hide these values and have less code
            in html_for_clackable_iamge.html file, check instructions in both files about using these methods.
            
            Example:-
            Use ${pendo.accountId} to provide the Account ID value
            Use ${pendo.getSerializedMetadata().visitor.metadataname} to get the value of a visitor level metadata field. Replace 'metadataname' with the name of the metadata field.
            Use ${pendo.getSerializedMetadata().account.metadataname} to get the value of an account level metadata field

            Privacy: anything in the URL can end up in browser history, logs, and analytics tools.
            Avoid personal data such as email addresses or names, and encode values used in the
            path or query string with encodeURIComponent().
            
            */

            // Step 1: choose where the account name comes from (use ONE of the two methods).

            // ** Method 1 (default) **
            // Get the account name metadata value using pendo.getSerializedMetadata.
            var metadata = pendo.getSerializedMetadata();
            var account_name = metadata && metadata.account && metadata.account.name;

            // ** Method 2 **
            // This method is a bit complex but can be used if you want to get metadata or any other value from the guide HTML directly.
            // Uncomment the below line to read the value from the guide HTML instead of Method 1.
            // var hiddenAccount = document.getElementsByClassName("_pendo-hidden-account_")[0]; account_name = hiddenAccount && hiddenAccount.textContent.trim();

            /*-----------------------------------------------------------------------------------------------------*/

            // Step 2: check the final value, whichever method provided it.
            // The value becomes part of the hostname, so only allow letters, digits, and hyphens.
            // Otherwise a value like "evil.com/" could send the user to another site.
            if (!account_name || !/^[a-z0-9-]+$/i.test(account_name)) {
                pendo.log('Dynamic permalink: account name is missing or not a valid subdomain; not redirecting.');
                return;
            }

            // Step 3: build the URL once, from the checked value.
            var newurl = "https://" + account_name + ".app.com/settings/manage?pendo=guide_id";

            //Finally dismissing the current guide to trigger the permalink.
            pendo.onGuideDismissed();

            // Opening the dynamic permalink url in the same browser tab after refreshing the page.
            window.open(newurl, "_self");
        }
    });
})(step, guide);
