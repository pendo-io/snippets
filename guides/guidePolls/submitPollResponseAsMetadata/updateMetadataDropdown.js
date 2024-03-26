// This guide sets new metadata for the visitor when they hit Submit!

// Get selector for dropdown
var personaSelect = document.querySelector('._pendo-multi-choice-poll-select');

// On guide submit, pass in persona selection as metadata
document.querySelector('[id^="pendo-button"]').addEventListener('click', updatePersona);

function updatePersona(){    
    // create visitor agent metadata field called 'persona'
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