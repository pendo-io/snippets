let reloadMultiStepGuide = dom => {
    if(!pendo.designerEnabled) {
        //remove existing event listeners from element
       dom("#ID OF BUTTON TO RESET GUIDE")[0].outerHTML = dom("#ID OF BUTTON TO RESET GUIDE")[0].outerHTML;
        
        // reset the guide to first step and dismiss the guide until page reload
        let dismissUntilReload = () => {
            pendo.onGuidePrevious(0);
            pendo.onGuideDismissed({"until": "reload"});
        };
        
        pendo.attachEvent(dom("#ID OF BUTTON TO RESET GUIDE")[0], 'click', dismissUntilReload);
    };
};

reloadMultiStepGuide(pendo.dom);