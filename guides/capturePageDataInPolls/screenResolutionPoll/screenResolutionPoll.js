(function screenResolutionPoll(step) {
    // Only look inside this guide, so inputs and buttons elsewhere on the page are not used
    var guideRoot = (step && step.guideElement && step.guideElement[0]) || document.getElementById('pendo-guide-container');
    if (!guideRoot) return;

    var widthInput = guideRoot.querySelector('[data-_pendo-open-text-poll-input-1]');
    var heightInput = guideRoot.querySelector('[data-_pendo-open-text-poll-input-2]');
    if (widthInput) widthInput.value = window.innerWidth;
    if (heightInput) heightInput.value = window.innerHeight;

    var submitTimer = setTimeout(function () {
        var submitButton = guideRoot.querySelector('.bb-button');
        if (submitButton) submitButton.click();
    }, 1000);

    // Don't submit if the guide closes before the timer fires
    if (step && step.after) {
        step.after('teardown', function () {
            clearTimeout(submitTimer);
        });
    }
})(step);
