/** 
 *  @name 			Contentful CMS - Dynamic Guide
 *  @author			Bert Grantges
 *  @description 	This code leverages content stored withing the Contentful CMS to dynaimcally populate the pendo guide based
 * 				    on a specific content ID. The content ID is pulled from the base application - which can be set by other 
 * 					Pendo content, the underlying app etc.
 * 
 *  				For the purposes of this example - the content structure in Contentful is:
 *   				- metric
 *      				- title
 *      				- description
 *      				- longDescription
 */
(function createDynamicGuide() {
	
	let contentfulAuthToken = 'CONTENTFUL_API_TOKEN';
	let contentfulSpaceId = 'CONTENTFUL_CONTENT_SPACE_ID';
	let contentId = window.ppContentGuideKey || 'YOUR_DEFAULT_CONTENT_KEY';

	_getGuideContent(contentfulAuthToken, contentfulSpaceId, contentId);

	/**
	 * @name 			_updateGuideUI
	 * @private
	 * @description		Updates the HTML elements of the guide based on a Contentful Content object
	 * @param {Object} 	content 
	 */
	function _updateGuideUI(content) {

        // Get object references to the Guide Content (ui.html)
		let guide = document.getElementById('pendo-guide-container');
        let title = document.getElementById('title');
		let details = document.getElementById('details');
		let description = document.getElementById('description');
		let metricBtn = document.getElementById('metricBtn');

        // Set UI element text values based on the content object
		title.innerText = content.title;
		details.innerText = content.longDescription;
		description.innerText = content.description;
		metricBtn.innerText = "View " + content.title; 
        
        // IMPORTANT - Because of the dynamic nature of the guide, Pendo's original placement on the screen center is not correctly aligned.
        //             This code block updates the position of the primary guide based on the new calculated height of the guide.
        let topOffset = (-1 * guide.offsetHeight / 2);
        guide.style.top = topOffset+'px';
        
	};

     /**
      * _getGuideContent
      * Takes a content Id and returns the content from the Contentful CMS
      * @param {String} contentId 
      */
	function _getGuideContent(token, spaceId, contentId) {

		// Build out the API query based on your Contentful tokens, space id and content id
		let query = 'https://cdn.contentful.com/' + spaceId + '/ntbw5oht064d/environments/master/entries/' + contentId + '?access_token=' + token;
        
        
        // Create an xhttp request object to fetch the query.
        let xhttp = new XMLHttpRequest(); 

		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
                
                result = JSON.parse(this.responseText);
                _updateGuideUI(result.fields);
                
                // Pendo Analytics Track Event - Custom Event based on guide title
                pendo.track("Dynamic Guide: "+result.fields.title, {
                     contentId: result.sys.id, 
                });
			}
		};
		xhttp.open("GET", query, true);
		xhttp.send();
	}

})();
