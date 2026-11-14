(function() {
    // This guide's own element. step.guideElement works for overlay and embedded guides; the fallback
    // matches any container ID that starts with pendo-guide-container (embedded guides add a suffix).
    var guideRoot = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
    if (!guideRoot) return; // don't hide Submit if the poll can't be wired up

    var submitButtonId = 'pendo-button-d661c167';
    pendo.dom('#' + submitButtonId).addClass('_pendo-custom-hidden');
    Array.prototype.forEach.call(guideRoot.querySelectorAll('[class^=_pendo-number-scale-poll]'), function(choice) {
        choice.addEventListener('click', function() {
            setTimeout(function() {
                var submitButton = document.getElementById(submitButtonId);
                if (submitButton) submitButton.click();
            }, 100);
        });
    });
})();
