(function (step, guide) {
    // Retrieve StepID from step object
    var stepId = step.id;
    
    var target = pendo.dom("#pendo-resource-center-container")[0];
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                createAccordions(stepId);
                target.classList.add('_pendo-acc-enabled');
            }
        })
    })
    var config = {
        attributeFilter: ['data-layout'],
        attributes: true,
        childList: true,
        characterData: true,
        subtree: false
    };

    if(!target.classList.contains('_pendo-acc-enabled')){
        observer.observe(target, config);
    }
})(step, guide);

function createAccordions(stepId){
    if(pendo.dom("#pendo-g-" + stepId + " #pendo-guide-container")[0]) {
        // Get first element which will be the header

        var announcementHeader = pendo.dom("#pendo-g-" + stepId + " #pendo-guide-container")[0].children[0];
        announcementHeader.style.cursor = "pointer";

        // Get rest of elements for accordion
        var accordionContents = [].slice.call(pendo.dom("#pendo-g-" + stepId + " #pendo-guide-container")[0].children).slice(1);

        pendo._.each(accordionContents, function(elem) {
            if(elem.classList.contains('_pendo-row')){
                elem.children[0].style.display = "none";
            } else {
                elem.style.display = "none";  
            }
        });

        announcementHeader.removeEventListener('click', expandable, false); // remove existing eventListeners
        announcementHeader.addEventListener('click', expandable, false);

        function expandable() {
            accordionContents = [].slice.call(pendo.dom("#pendo-g-" + stepId + " #pendo-guide-container")[0].children).slice(1);
            if(!announcementHeader.classList.contains('_pendo-acc-active')) {
                pendo.dom("#pendo-g-" + stepId)[0].style.height = "auto";
                announcementHeader.classList.add('_pendo-acc-active');
                pendo._.each(accordionContents, function(elem) {
                    if(elem.classList.contains('_pendo-row')){
                        elem.children[0].style.display = "block";
                    } else {
                        elem.style.display = "block";  
                    }  
                });
            } else {
                announcementHeader.classList.remove('_pendo-acc-active');
                pendo._.each(accordionContents, function(elem) {
                    if(elem.classList.contains('_pendo-row')){
                        elem.children[0].style.display = "none";
                    } else {
                        elem.style.display = "none";  
                    } 
                });
            }
        };
    }   
}