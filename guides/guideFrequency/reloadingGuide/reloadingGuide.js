(function reloadingGuide() {
    if(!pendo.designerEnabled) {
        // Only use this guide's close button, not another guide's
        var guideContainer = document.getElementById('pendo-guide-container');
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
