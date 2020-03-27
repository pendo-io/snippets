(function(dom) {
    dom(document).on('click', 'body', function hideGuide(e) {
        if (
            !dom(eventTarget(e)).closest('#{{ID Goes Here}}').length
        ) {
            pendo.onGuideDismissed();
        }
    });
    ​
    function eventTarget (e) {
        return (e && e.target) || e.srcElement;
    }
})(pendo.dom);