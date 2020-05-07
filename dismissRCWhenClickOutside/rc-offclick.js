/*
Put this code snippet in a custom code block on a tooltip guide pointing to the element '._pendo-resource-center-badge-container'
Set the guide to display on 'Target Element', with the settings 'display on hover or click' and 'display every time'
Add this line to the CSS tab of the custom code block on the guide:
display: none !important;
End result: The 2.0 Pendo Resource Center will hide itself when a click is registered outside of the resource center container
*/
(function offclickRC(dom) {
    if (!pendo.designerEnabled) {
        if (!pendo.pro) {
            pendo.pro = {}
        }
        //window.alert("The Resource Center badge was hovered over.");
		if(!pendo.pro.hideRC) {
            pendo.pro.hideRC = function(e) {
                var tgt = e.target || e.srcElement;
                if (!dom(tgt).closest('#pendo-resource-center-container').length) {
                    window.pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter().hide();
                }
            }
            pendo.attachEvent(document, 'click', pendo.pro.hideRC);
        }
    }
})(pendo.dom);
