/*
Put this code snippet in a custom code block on a tooltip guide pointing to the element '._pendo-resource-center-badge-container'
Set the guide to display on 'Target Element', with the settings 'display on click' and 'display every time'
Add this line to the CSS tab of the custom code block on the guide:
display: none !important;
End result: The 2.0 Pendo Resource Center will hide itself when a click is registered outside of the resource center container. This won't work if the Resource Center is activated via target element.
*/
(function offclickRC(dom) {
    if (!pendo.designerEnabled) {
        if (!pendo.pro) {
            pendo.pro = {
                rcHidden: true,
            }
        }

	    if(!pendo.pro.hideRC) {
            pendo.pro.hideRC = function(e) {
                const tgt = e.target || e.srcElement;
                if (!dom(tgt).closest('#pendo-resource-center-container').length) {
                    pendo.BuildingBlocks.BuildingBlockResourceCenter.dismissResourceCenter();
                    pendo.pro.rcHidden = true;
                } else if (tgt.classList.contains("_pendo-resource-center-close-button")) {
                    pendo.pro.rcHidden = true;
                }
            }
            pendo.attachEvent(document, 'click', pendo.pro.hideRC);
        }

        pendo.onGuideDismissed(guide.steps[guide.getPositionOfStep(step) - 1]);

        if(pendo.pro.rcHidden) {
	        pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter().show();
            pendo.pro.rcHidden = false;
        } else {
            pendo.BuildingBlocks.BuildingBlockResourceCenter.dismissResourceCenter();
            pendo.pro.rcHidden = true;
        }
    }
})(pendo.dom);