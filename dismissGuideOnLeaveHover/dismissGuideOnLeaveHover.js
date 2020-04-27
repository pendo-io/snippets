/*
* By default, guides set to appear on hovering a target element do not dismiss when the visitor hovers off the target element
* This snippet enables that behavior for target elements
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