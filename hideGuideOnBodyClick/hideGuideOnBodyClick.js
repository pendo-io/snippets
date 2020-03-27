
(function hideGuideOnBodyClick(dom) {
    function hideGuide(e) {
        if (
            !dom(eventTarget(e)).closest('#pendo-guide-container').length
        ) {
            pendo.onGuideDismissed();
        }
    };
    
    pendo.attachEvent(document, 'click', hideGuide);
    
    function eventTarget (e) {
        return (e && e.target) || e.srcElement;
    }
    
    // step wrappable method to clear all event listeners
    step.after('teardown', function () {
        pendo.detachEvent(document, 'click', hideGuide);
    });
})(pendo.dom);
