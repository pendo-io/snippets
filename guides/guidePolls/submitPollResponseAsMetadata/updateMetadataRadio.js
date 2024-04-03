// This guide sets new metadata for the visitor when they hit Submit! 

var userRole; // This variable will hold the selected user role

// Get value of radio button selection to pass to userRole 
document.querySelector('[id^="pendo-select-container-"]').addEventListener('change', getChecked);

function getChecked() {
    // Update the global userRole variable with the selected radio button's label, update poll values to pass in different roles
    // Note that userRole is a variable, passing in the radio button selection.
    userRole = pendo.dom(`[for="${pendo.dom('#pendo-guide-container input:radio:checked')[0].id}"]`)[0].textContent;
}

// On guide submit, pass in persona selection as metadata
document.querySelector('[id^="pendo-button"]').addEventListener('click', updatePersona);

function updatePersona() {    
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
