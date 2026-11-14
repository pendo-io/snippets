(function reloadingGuide() {
    if(!pendo.designerEnabled) {
        // Only use this guide's close button, not another guide's
        // This guide's own element. step.guideElement works for overlay and embedded guides; the fallback
        // matches any container ID that starts with pendo-guide-container (embedded guides add a suffix).
        var guideContainer = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
        var old_element = guideContainer && guideContainer.querySelector('._pendo-close-guide');
        if (!old_element) return;
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        
        var closeButton = new_element;
        
        function dismissUntilReload() {
            // guide dismissed until reload, at which point it will no longer be in the payload
            pendo.onGuideDismissed({"until":"reload"});
        }
        
        pendo.attachEvent(closeButton, 'click', dismissUntilReload);
    }
})();
