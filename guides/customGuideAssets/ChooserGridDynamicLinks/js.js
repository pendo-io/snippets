(function wireNextGuideButton(step) {

    // Uncomment the below to get the account name metadata value to be used ahead in the URL using pendo.getSerializedMetadata.
    // const account_name = pendo.getSerializedMetadata().account.name;

    step && step.attachEvent(step.guideElement[0], 'click', function (e) {
 
       var guides = {
          guide_1: 'guide1', // Place guide id between the quotation marks
          guide_2: 'guide2', // Place guide id between the quotation marks
          guide_3: 'guide3', // Place guide id between the quotation marks
       };
 
       var imageClasses = {
          img_1: 'opt1', // Place image id between the quotation marks
          img_2: 'opt2', // Place image id between the quotation marks
          img_3: 'opt3', // Place image id between the quotation marks
       };

        // Uncomment the below get the account name metadata value to be used ahead in the URL using pendo.getSerializedMetadata.
        var account_name = pendo.getSerializedMetadata().account.name;

        // build your URL by using the account name metadata directly.
        var newurl = "https://" + account_name + ".app.com/settings/manage?pendo=guide_id"
 
       var advanceButton = pendo.dom(e.target || e.srcElement).closest('.guide-image');
 
       // This command will show the guide of the ID provided
       if (advanceButton.length) {
          var imageClass = advanceButton[0].classList[0];
          var guideId = Object.keys(imageClasses).find(key => imageClasses[key] === imageClass);
          guideId = guides[guideId];
 
          // This command dismisses the current active guide.
          pendo.onGuideDismissed();
          // Use the below code to trigger another guide via guide id on the same page.
          pendo.showGuideById(guideId);
          // if you want to use dynamic permalink the comment the above line.
 
          /* Uncomment below lines in case you want to build dynamic permalink URL to dismiss the current guide.
          Then redirect the user to another page using the metadata variables. */

          // var newurl = "https://" + account_name + ".app.com/?pendo=guideId";
          // window.open(newurl, "_self");
       }
    })
 })(step, guide);