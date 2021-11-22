/*
Put this code snippet in a custom code block on a tooltip guide pointing to the element that you are using to activate the resource center.
Set the guide to display on 'Target Element', with the settings 'display on click' and 'display every time'
Add this line to the CSS tab of the custom code block on the guide:
display: none !important;
End result: The 2.0 Pendo Resource Center will hide itself when a click is registered outside of the resource center container. This snippet should work with target element activated resource centers.
*/
pendo.onGuideDismissed(guide.steps[guide.getPositionOfStep(step) - 1]);
step.after('teardown', offclickRC(pendo.dom));
function offclickRC(dom) {
        console.log("RC Launch element clicked.")
        if (!pendo.designerEnabled) {
            if (!pendo.pro) {
                pendo.pro = {}
            }

            if(dom('#pendo-resource-center-container').length){
                pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter().activeStep().dismiss()
            }
            if(!pendo.pro.hideRC) {
                pendo.pro.hideRC = function(e) {
                    var tgt = e.target || e.srcElement;
                    if (dom('#pendo-resource-center-container').length && !dom(tgt).closest('#pendo-resource-center-container').length && !dom(tgt).closest(step.elementPathRule).length){
                        pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter().activeStep().dismiss()
                    }
                }
                pendo.attachEvent(document, 'click', pendo.pro.hideRC);
            }
        }
    }