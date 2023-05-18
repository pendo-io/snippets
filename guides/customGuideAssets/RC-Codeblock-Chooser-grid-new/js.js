(function wireNextGuideButton(step) {

    // Uncomment the below to get the account name metadata value to be used ahead in the URL using pendo.getSerializedMetadata.
    // const account_name = pendo.getSerializedMetadata().account.name;

    step && step.attachEvent(step.guideElement[0], 'click', function(e) {

        /*var guides = {
            guide_1: 'Hb26BrTG490qIszrKU43h-_K0Vg', // Dashboard WT Guide
            guide_2: 's03C3V6h8nnkFBVIV3QpEq1fyUU', // New SI | Dashboard Starting Page | Alerts Prefrences WT Guide
        };

        var imageClasses = {
            img_1: 'cont_1',
            img_2: 'cont_3'
        };
        */

        var guide_1 = 'Hb26BrTG490qIszrKU43h-_K0Vg';
        // get the first clickable image in the guide.
        var advanceButton = pendo.dom(e.target || e.srcElement).closest('.cont_1');
 
        //var advanceButton = pendo.dom(e.target || e.srcElement).closest('.container');

        // This command will show the guide of the ID provided
        if (advanceButton.length) {
            // var imageClass = advanceButton[0].classList[0];
            // var guideId = Object.keys(imageClasses).find(key => imageClasses[key] === imageClass);
            // guideId = guides[guideId];

            // This command dismisses the current active guide.
            pendo.onGuideDismissed();
            // Use the below code to trigger another guide via guide id on the same page.
            pendo.showGuideById(guide_1);
        }
    })
})(step, guide);


(function wireNextGuideButton(step) {
    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
        var guide_2 = 's03C3V6h8nnkFBVIV3QpEq1fyUU'; // Place guide id between the quotation marks
        var advanceButton = pendo.dom(e.target || e.srcElement).closest('.cont_2');
        if (advanceButton.length) {
            // This command dismisses the current active guide.
            pendo.onGuideDismissed();
            // Use the below code to trigger another guide via guide id on the same page.
            pendo.showGuideById(guide_2);
        }
    })
})(step, guide);
