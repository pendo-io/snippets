(function reloadingGuide() {
    if(!pendo.designerEnabled) {
        var old_element = document.querySelectorAll('._pendo-close-guide')[0];
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        
        var closeButton = document.querySelectorAll('._pendo-close-guide')[0]
        
        function dismissUntilReload() {
            // guide dismissed until reload, at which point it will no longer be in the payload
            pendo.onGuideDismissed({"until":"reload"});
        }
        
        pendo.attachEvent(closeButton, 'click', dismissUntilReload);
    }
})();
