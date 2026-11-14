/*
* By default, guides set to appear on hovering a target element do not 
* dismiss when the visitor hovers off the target element, the way badge guides do
* This snippet enables the badge-style behavior for target element tooltips
*/

(function dismissGuideOnLeaveHover(dom) {
    function mouseoverHandler(e) {
        var tgt = e.target || e.srcElement;
        // Stay open while the pointer is on the target element or on the tooltip itself
        if (!dom(tgt).closest(step.elementPathRule).length && !dom(tgt).closest('#pendo-guide-container').length) {
            pendo.onGuideDismissed();
            pendo.detachEvent(window, 'mouseover', mouseoverHandler);
        }
    }

	pendo.attachEvent(window, 'mouseover', mouseoverHandler);

    // If the guide closes some other way, stop listening so later guides aren't dismissed
    step.after('teardown', function () {
        pendo.detachEvent(window, 'mouseover', mouseoverHandler);
    });
})(pendo.dom)