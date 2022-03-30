(function (step, guide) {
    var stepId = step.id;
    var guideId = step.guideId;

    var target = pendo.dom("#pendo-resource-center-container")[0];
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                if(!target.classList.contains('_pendo-acc-enabled')) {
                    target.classList.add('_pendo-acc-enabled');
                }
                createAccordions(stepId, guideId);
                reverseEng(stepId, guideId);
            }
            if (mutation.removedNodes.length) {
                if (mutation.removedNodes[0].dataset.layout == "AnnouncementsModule") {
                    target.classList.remove('_pendo-acc-enabled');
                    observer.disconnect();
                }
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

function createAccordions(stepId, guideId){
   var validId = "";
   if(pendo.dom("#pendo-g-" + stepId + " #pendo-guide-container")[0]) {
        validId = stepId;
   }

   if(pendo.dom("#pendo-g-" + guideId + " #pendo-guide-container")[0]) {
        validId = guideId;
   }

   if(pendo.dom("#pendo-g-" + validId + " #pendo-guide-container")[0]) {
        // Get first element which will be the header

        var announcementHeader = pendo.dom("#pendo-g-" + validId + " #pendo-guide-container")[0].children[0];
        announcementHeader.style.cursor = "pointer";
        announcementHeader.classList.add('_pendo-acc-collapsed');
        localStorage.setItem("_pendo_rc_" + guideId, "true");

        // Get rest of elements for accordion
        var accordionContents = [].slice.call(pendo.dom("#pendo-g-" + validId + " #pendo-guide-container")[0].children).slice(1);
        pendo._.each(accordionContents, function(elem) {
            if(elem.classList.contains('_pendo-row')){
                if(elem.children.length>1) {
                    // This is :tears-of-blood-emoji: but Pendo is horizontal aligning in a stupid way, so it's necessary
                    elem.style.textAlign = "right";
                    pendo._.each(elem.children, function(child) {
                        child.style.verticalAlign = "bottom";
                        child.style.display = "inline-block";
                	});
                }
                pendo._.each(elem.children, function(child) {
                	child.style.display = "none";
                });
            } else {
                elem.style.display = "none";
            }
        });

        announcementHeader.removeEventListener('click', expandable, false); // remove existing eventListeners
        announcementHeader.addEventListener('click', expandable, false);

        function expandable() {
            accordionContents = [].slice.call(pendo.dom("#pendo-g-" + validId + " #pendo-guide-container")[0].children).slice(1);
            if(!announcementHeader.classList.contains('_pendo-acc-active')) {
                pendo.dom("#pendo-g-" + validId)[0].style.height = "auto";
                announcementHeader.classList.add('_pendo-acc-active');
                announcementHeader.classList.remove('_pendo-acc-collapsed');
                pendo._.each(accordionContents, function(elem) {
                    if(elem.classList.contains('_pendo-row')){
                        if(elem.children.length>1) {
                            pendo._.each(elem.children, function(child) {
                                child.style.display = "inline-block";
                            });
                        } else {
                            pendo._.each(elem.children, function(child) {
                              child.style.display = "block";
                          });
                        }
                    } else {
                        elem.style.display = "block";
                    }
                });
                window.dispatchEvent(new Event('resize'));
            } else {
                announcementHeader.classList.remove('_pendo-acc-active');
                announcementHeader.classList.add('_pendo-acc-collapsed');
                pendo._.each(accordionContents, function(elem) {
                    if(elem.classList.contains('_pendo-row')){
                        pendo._.each(elem.children, function(child) {
                           child.style.display = "none";
                        });
                    } else {
                        elem.style.display = "none";
                    }
                });
            }
        };
    }
}

function reverseEng(stepId, guideId) {
	window.addEventListener('resize', function() {
        setTimeout(function(){
		var validId = "";
		if(pendo.dom("#pendo-g-" + stepId + " #pendo-guide-container")[0]) {
			validId = stepId;
		}

		if(pendo.dom("#pendo-g-" + guideId + " #pendo-guide-container")[0]) {
			validId = guideId;
		}
		accordionContents = [].slice.call(pendo.dom("#pendo-g-" + validId + " #pendo-guide-container")[0].children).slice(1);
		if(pendo.dom("#pendo-g-" + validId + " #pendo-guide-container")[0].children[0].classList.contains('_pendo-acc-collapsed')) {
        	pendo._.each(accordionContents, function(elem) {
            	if(elem.classList.contains('_pendo-row')){
                	pendo._.each(elem.children, function(child) {
                    	child.style.display = "none";
                	});
            	} else {
                	elem.style.display = "none";
            	}
        	});
      	} else if (!pendo.dom("#pendo-g-" + validId + " #pendo-guide-container")[0].children[0].classList.contains('_pendo-acc-collapsed')){
      			var learnMore = pendo.dom(".pendo-mock-flexbox-row [id^='pendo-link-']")[0];
           	    learnMore.parentElement.parentElement.parentElement.parentElement.style.position = "unset";
                learnMore.parentElement.parentElement.parentElement.parentElement.style.paddingRight = "12px";
           	    learnMore.parentElement.parentElement.parentElement.parentElement.parentElement.style.minHeight = "unset";
      }
        }, 50);
	}, false);
}
