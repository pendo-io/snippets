(function() {
    var submitButtonId = 'pendo-button-d661c167';
    pendo.dom('#' + submitButtonId).addClass('_pendo-custom-hidden');
    pendo.dom('#pendo-guide-container [class^=_pendo-number-scale-poll]').on('click', function() {
        setTimeout(function() {
            var submitButton = document.getElementById(submitButtonId);
            if (submitButton) submitButton.click();
        }, 100);
    });
})();
