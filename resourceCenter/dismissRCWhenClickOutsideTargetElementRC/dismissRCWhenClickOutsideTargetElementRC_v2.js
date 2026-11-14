/*
- Update the rcCustomElement variable to match the CSS selector of the element
  that will trigger the RC.
- Put this code snippet in a custom code block on a tooltip guide pointing to
  the element used to activate the RC.
- Set the guide to display on 'Target Element', with the settings 'display on
  hover' and 'display every time'
- Add this line to the CSS tab of the custom code block on the guide:
  display: none !important;
- End result: The Pendo Resource Center will hide itself when a click is
  registered outside of the resource center container or outside of the custom
  element.
*/
(function offclickRC(dom) {
    // the element that will trigger the RC
    const rcCustomElement = ".custom_rc_element";

    // exit if we're in the designer
    if (pendo.designerEnabled) {
        pendo.log("RC offclick disabled in designer");
        return;
    }

    // initialize pendo.pro if it doesn't exist
    if (!pendo.pro) {
        pendo.pro = {};
    }

    // dismiss ourselves (the hidden helper guide) on every path
    function dismissSelf() {
        pendo.onGuideDismissed(guide.steps[guide.getPositionOfStep(step) - 1]);
    }

    // if the event listener already exists, just dismiss
    if (typeof pendo.pro.hideRC === "function") {
        dismissSelf();
        return;
    }

    // no RC yet: don't attach, but let a later run try again
    if (!pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter()) {
        pendo.log("RC offclick not attached yet, no RC found");
        dismissSelf();
        return;
    }

    // event listener to hide the RC if a click is registered outside of the RC
    pendo.pro.hideRC = function (e) {
        // if the RC isn't shown, don't do anything
        const rc = pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter();
        if (!rc || !rc.isShown()) {
            return;
        }

        // get the target of the click and the RC node
        const tgt = e.target || e.srcElement;
        const rcNode = dom("#pendo-resource-center-container")[0];
        if (!rcNode) {
            return;
        }

        // if the target is outside of the RC and outside of the custom element,
        // hide the RC
        if (
            !rcNode.contains(tgt) &&
            !dom(tgt).closest(rcCustomElement).length
        ) {
            pendo.BuildingBlocks.BuildingBlockResourceCenter.dismissResourceCenter();
        }
    };

    // attach the event listener to the document
    pendo.attachEvent(document, "click", pendo.pro.hideRC);
    pendo.log("RC offclick attached");

    dismissSelf();
})(pendo.dom);
