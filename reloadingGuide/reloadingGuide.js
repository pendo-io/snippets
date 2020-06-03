(function reloadingGuide(dom) {
    if(!pendo.designerEnabled) {
        dom('._pendo-close-guide')[0].outerHTML = dom('._pendo-close-guide')[0].outerHTML; // remove direct event listener on close button
        
        function dismissUntilReload() {
            // guide dismissed until reload, at which point it will no longer be in the payload
            pendo.onGuideDismissed({"until":"reload"});
        }
        pendo.attachEvent(dom('._pendo-close-guide')[0], 'click', dismissUntilReload);
    }
})(pendo.dom);