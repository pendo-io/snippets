// This guide sets new metadata for the visitor when they hit Submit!

// Only look inside the guide, so elements in the host app or other guides are not used
var guideContainer = document.getElementById('pendo-guide-container');

// Get selector for dropdown
var personaSelect = guideContainer && guideContainer.querySelector('._pendo-multi-choice-poll-select');

// On guide submit, pass in persona selection as metadata.
// This uses the first button in the guide; if the guide has more than one button
// (for example Back and Submit), replace the selector with your Submit button's ID.
var submitButton = guideContainer && guideContainer.querySelector('[id^="pendo-button"]');
if (submitButton) submitButton.addEventListener('click', updatePersona);

function updatePersona(){    
    // create visitor agent metadata field called 'persona', this property can be updated to satifsfy different naming requirements
    // 'userRole' is the value pulled from available options in the multi-select poll. Update the poll to provide different values.
    if (!personaSelect || personaSelect.selectedIndex < 0) return;
    let userRole = personaSelect.options[personaSelect.selectedIndex].text;
    const account = window.pendo.getSerializedMetadata().account;
    const visitor = window.pendo.getSerializedMetadata().visitor;
	window.pendo.updateOptions({
        account: {
			...account,
		},
		visitor: {
			...visitor,
			persona: userRole
		},
	});
    
	// guarantee the correct guide payload for the new metadata
	pendo.loadGuides();
}
