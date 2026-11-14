(function() {
    // This guide's own element. step.guideElement works for overlay and embedded guides; the fallback
    // matches any container ID that starts with pendo-guide-container (embedded guides add a suffix).
    var guideRoot = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
    if (!guideRoot) return;

    // Find this guide's Submit button once, so the hide and the click can't reach another guide's button
    var submitButtonId = 'pendo-button-d661c167';
    var submitButton = guideRoot.querySelector('#' + submitButtonId);
    if (!submitButton) return; // don't change anything if the button isn't in this guide
    submitButton.classList.add('_pendo-custom-hidden');

    // Only one submission is ever pending: repeated clicks restart the short delay instead of adding more
    var pendingSubmit = null;
    function scheduleSubmit() {
        clearTimeout(pendingSubmit);
        pendingSubmit = setTimeout(function() {
            pendingSubmit = null;
            if (guideRoot.contains(submitButton)) submitButton.click();
        }, 100);
    }

    Array.prototype.forEach.call(guideRoot.querySelectorAll('[class^=_pendo-number-scale-poll]'), function(choice) {
        choice.addEventListener('click', scheduleSubmit);
    });

    // If the step closes during the delay, don't submit
    if (typeof step !== 'undefined' && step && step.after) {
        step.after('teardown', function() {
            clearTimeout(pendingSubmit);
        });
    }
})();
