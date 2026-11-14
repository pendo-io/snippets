// This guide sets new metadata for the visitor when they hit Submit! 

var userRole; // This variable will hold the selected user role

// Only look inside the guide, so elements in the host app or other guides are not used
var guideContainer = document.getElementById('pendo-guide-container');

// Get value of radio button selection to pass to userRole 
var selectContainer = guideContainer && guideContainer.querySelector('[id^="pendo-select-container-"]');
if (selectContainer) selectContainer.addEventListener('change', getChecked);

function getChecked() {
    // Update the global userRole variable with the selected radio button's label, update poll values to pass in different roles
    // Note that userRole is a variable, passing in the radio button selection.
    var checked = pendo.dom('#pendo-guide-container input:radio:checked')[0];
    var label = checked && pendo.dom(`#pendo-guide-container [for="${checked.id}"]`)[0];
    if (label) userRole = label.textContent;
}

// On guide submit, pass in persona selection as metadata.
// This uses the first button in the guide; if the guide has more than one button
// (for example Back and Submit), replace the selector with your Submit button's ID.
var submitButton = guideContainer && guideContainer.querySelector('[id^="pendo-button"]');
if (submitButton) submitButton.addEventListener('click', updatePersona);

function updatePersona() {    
    // Don't overwrite the metadata if nothing was selected
    if (!userRole) return;

    // Get the current serialized metadata
    const account = window.pendo.getSerializedMetadata().account;
    const visitor = window.pendo.getSerializedMetadata().visitor;

    // Update the visitor metadata with the selected user role
    // If different key required other than persona, change below
    window.pendo.updateOptions({
        account: {
            ...account,
        },
        visitor: {
            ...visitor,
            persona: userRole // Use the userRole variable directly
        },
    });
}
