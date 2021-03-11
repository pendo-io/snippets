/*
* By default, guides set to appear on hovering a target element do not 
* dismiss when the visitor hovers off the target element, the way badge guides do
* This snippet enables the badge-style behavior for target element tooltips
*/

(function dismissGuideOnLeaveHover(dom) {
    function mouseoverHandler(e) {
        var tgt = e.target || e.srcElement;
        if (!dom(tgt).closest(step.elementPathRule).length) {
            pendo.onGuideDismissed();
            pendo.detachEvent(window, 'mouseover', mouseoverHandler);
        }
    }

	pendo.attachEvent(window, 'mouseover', mouseoverHandler);
})(pendo.dom)