/**
 * The below should be used to amend the Pendo initialization within
 * the code of the relevant application. The visitor and account
 * objects should be filled with metadata as normal
 */
pendo.initialize({
    events: {
        guidesLoaded: () => {
            const hideResourceCenterOffClick = e => {
                let tgt = e.target;
                if (pendo.dom('#pendo-resource-center-container').length && !pendo.dom(tgt).closest('#pendo-resource-center-container').length && !pendo.dom(tgt).closest(pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter().steps[0].elementPathRule).length) {
                    pendo.BuildingBlocks.BuildingBlockResourceCenter.dismissResourceCenter();
                };
            };

            pendo.attachEvent(document, 'click', hideResourceCenterOffClick);
        }
    },

    visitor: {
        // visitor object here
    },
    
    account: {
        // account object here
    },
})