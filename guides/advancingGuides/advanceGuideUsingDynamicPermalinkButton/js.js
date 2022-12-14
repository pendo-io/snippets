(function wireNextGuideButton(step) {
    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
        var advanceButton = pendo.dom(e.target || e.srcElement).closest('.opt1');
        if (advanceButton.length) {
            // get the text value of the fetched metadata to be used ahead.
            var account_name = document.getElementsByClassName("_pendo-hidden-account_")[0].innerHTML

            // build your URL by using the variable above.
            var newurl = "https://" + account_name + ".abm.6sense.com/settings/integration/manage?pendo=LvGZXdsqwUbxZKzkqAvXlCZkDgc"

            //Finally dismissing the current guide to trigger the permalink.
            pendo.onGuideDismissed();

            // Opening the dynamic permalink url in the same browser tab.
            window.open(newurl, "_self");
        }
    });
})(step, guide);
