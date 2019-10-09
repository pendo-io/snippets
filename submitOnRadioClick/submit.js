(function() {
    var submitButtonId = 'pendo-button-d661c167';
    pendo.dom('#' + submitButtonId).addClass('_pendo-custom-hidden');
    pendo.dom('[class^=_pendo-number-scale-poll]').on('click', () => {
        setTimeout(() => {
            document.getElementById(submitButtonId).click();
        }, 100);
    });
})();