/*
 *  Creates a custom close button based on an image.
 */
(function _overrideCloseBehavior(imageURL, guide){
 
    /* Create the custom button element */
    let closeBtn = document.createElement('IMG');
    closeBtn.id = '_pinptCloseBtn';
    closeBtn.src = imageURL;

    /* Style the button */
    closeBtn.style.float = 'none';
    closeBtn.style.position = 'absolute'; 
    closeBtn.style.top = '0px';
    closeBtn.style.right = '0px';
    closeBtn.style.height = 'auto';
    closeBtn.style.width = '75px';       // <-- REPLACE WITH YOUR IMAGE WIDTH
    
    /* Set button onClick to pendo function to dismiss active guide */
    closeBtn.onclick = pendo.onGuideDismissed; 
  
    /* Check to see if the user clicks on the backdrop */
    document.addEventListener('click', function(evt) { 
		let elem = evt.target || evt.srcElement;
        
        // If the user clicked on the pendo backdrop dismiss it.
        if(elem.id === 'pendo-backdrop') {
            pendo.onGuideDismissed();
        }
     
    }, false);

    /* Insert the new close button into the DOM of the guide */
    guide.appendChild(closeBtn);
    
})( 
    '<URL_TO_YOUR_CLOSE_BUTTON_IMAGE>',
    document.getElementById('pendo-guide-container')
);
