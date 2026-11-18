var requiredQuestions = [];
var requiredPollIds = [];
var dependentButtons = [];
var textForDisabledButtons = ["Submit", "Next", "Finish"];
var isButtonDisabled = false;

// Only match elements inside the guide, so buttons in the host app or other guides are not touched
function requiredQuestionsGuideRoot() {
    // This guide's own element. step.guideElement works for overlay and embedded guides; the fallback
    // matches any container ID that starts with pendo-guide-container (embedded guides add a suffix).
    return (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
}

function requiredQuestionsInGuide(selector) {
    var guideContainer = requiredQuestionsGuideRoot();
    return Array.prototype.filter.call(pendo.dom(selector), function(el) {
        return guideContainer && guideContainer.contains(el);
    });
}

function requiredHTML(dataPendoPollId) {
    return '<span class="required-wrapper" name="' +  dataPendoPollId + '"> *</span>';
} 

function disableEligibleButtons(textForDisabledButtons) {
    for(var i=0; i < textForDisabledButtons.length; i++) {
        var eligibleButtons = requiredQuestionsInGuide("._pendo-button:contains('" + textForDisabledButtons[i] + "')");
        for (var k=0; k < eligibleButtons.length; k++) {
            eligibleButtons[k].disabled = true;
        }
    }
}

function enableEligibleButtons(textForDisabledButtons) {
    for(var i=0; i < textForDisabledButtons.length; i++) {
        var eligibleButtons = requiredQuestionsInGuide("._pendo-button:contains('" + textForDisabledButtons[i] + "')");
        for (var k=0; k < eligibleButtons.length; k++) {
            eligibleButtons[k].disabled = false;
        }
    }
}

if(!pendo.designerEnabled) {
    function processRequiredQuestions() {
        requiredQuestions = requiredQuestionsInGuide("._pendo-open-text-poll-question:contains('[REQUIRED]'), ._pendo-number-scale-poll-question:contains('[REQUIRED]'), ._pendo-multi-choice-poll-question:contains('[REQUIRED]')");
        for(i=0; i<requiredQuestions.length; i++) {
            var dataPendoPollId = requiredQuestions[i].getAttribute("data-pendo-poll-id");
            requiredPollIds.push(dataPendoPollId);
            if(pendo.dom("._pendo-multi-choice-poll-select-border[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0]) {
                pendo.dom("._pendo-multi-choice-poll-select-border[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0].insertAdjacentHTML('afterEnd', requiredHTML(dataPendoPollId));
            } else {
                pendo.dom(".pendo-block-wrapper[data-pendo-poll-id='" + dataPendoPollId + "']")[0].insertAdjacentHTML('afterEnd', requiredHTML(dataPendoPollId));
            }
            requiredQuestions[i].innerText = requiredQuestions[i].textContent.replace("[REQUIRED]", "");
        }
        if(requiredPollIds.length>0) {
            disableEligibleButtons(textForDisabledButtons);
        }
    }

    function evaluateRequiredQuestions() {
        var allRequiredComplete = true;
        for(var i = 0; i < requiredPollIds.length; i++) {
            if (pendo.dom("._pendo-open-text-poll-wrapper[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0]) {
                if(pendo.dom("._pendo-open-text-poll-wrapper[data-pendo-poll-id='" + requiredPollIds[i] + "'] textarea")[0].value == "") {
                    var allRequiredComplete = false;
                }
            }
            if (pendo.dom("._pendo-number-scale-poll-wrapper[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0]) {
                if(!(pendo.dom("._pendo-number-scale-poll-wrapper[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0].querySelector(':checked'))) {
                    var allRequiredComplete = false;
                }
            }
            if (pendo.dom("._pendo-multi-choice-poll-select-border[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0]) {
                if(!(pendo.dom("._pendo-multi-choice-poll-select-border[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0].querySelector(':checked'))) {
                	var allRequiredComplete = false;
                } else if (pendo.dom("._pendo-multi-choice-poll-select-border[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0].querySelector(':checked')) {
                	if(pendo.dom("._pendo-multi-choice-poll-select-border[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0].querySelector(':checked').textContent == "--") {
                		var allRequiredComplete = false;
                	}
                }
            }        
        }

        if (allRequiredComplete) {
            enableEligibleButtons(textForDisabledButtons);
        } else {
            disableEligibleButtons(textForDisabledButtons);
        }
    }

    processRequiredQuestions();

    requiredQuestionsInGuide("._pendo-open-text-poll-input").forEach(textbox => {
        textbox.addEventListener("input", function() {
            evaluateRequiredQuestions();
        })
    })

    var requiredGuideRoot = requiredQuestionsGuideRoot();
    requiredGuideRoot && requiredGuideRoot.addEventListener("click", function(event){
        if(!event.target.classList.contains("_pendo-button")) {
           evaluateRequiredQuestions(); 
        }
    });

    requiredGuideRoot && requiredGuideRoot.addEventListener("change", function(event){
        if(!event.target.classList.contains("_pendo-button")) {
           evaluateRequiredQuestions(); 
        }
    });

}

if(pendo.designerEnabled) {                          
    var addRequiredMutationListener = function() {
        var target = document.querySelector('#pendo-guide-container');

        // create an observer instance
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    // Add requiredToggle if new Open Text Poll is added
                    if(mutation.addedNodes[0].querySelector("._pendo-open-text-poll-wrapper, ._pendo-number-scale-poll-wrapper, ._pendo-multi-choice-poll-select-border")) {
                        var dataPendoPollId = "";
                        if(mutation.addedNodes[0].querySelector("._pendo-open-text-poll-wrapper, ._pendo-number-scale-poll-wrapper")) {
                            var dataPendoPollId = mutation.addedNodes[0].querySelector("form").getAttribute("name");
                        } else {
                            var dataPendoPollId = mutation.addedNodes[0].querySelector("._pendo-multi-choice-poll-select-border").getAttribute("data-pendo-poll-id");
                        }

                        var pollQuestion = "";
                        var questionText = "";
                        if(pendo.dom("._pendo-open-text-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0]) {
                            pollQuestion = pendo.dom("._pendo-open-text-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0];
                        }
                        if(pendo.dom("._pendo-number-scale-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0]) {
                            pollQuestion = pendo.dom("._pendo-number-scale-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0];
                        }
                        if(pendo.dom("._pendo-multi-choice-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0]) {
                            pollQuestion = pendo.dom("._pendo-multi-choice-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0];
                        }      
                        questionText = pollQuestion.textContent;                     
        		        

                        if(questionText.includes("[REQUIRED]")){
							pollQuestion.firstChild.firstChild.innerHTML = pollQuestion.firstChild.firstChild.innerHTML + requiredHTML(dataPendoPollId);
                            // The question can render again while editing; add it once, never toggle it off here
                            if(!requiredQuestions.includes(dataPendoPollId)) {
                                requiredQuestions.push(dataPendoPollId);
                            }
                            
                        } else {
                            if(requiredQuestions.includes(dataPendoPollId)) {
                                var index = requiredQuestions.indexOf(dataPendoPollId);
                                if (index !== -1) {
                                requiredQuestions.splice(index, 1);
                                }
                            }
                        }
                    }

                    var allRequiredComplete = true;
                    for(var i = 0; i < requiredQuestions.length; i++) {
                        if (pendo.dom("._pendo-open-text-poll-wrapper[data-pendo-poll-id='" + requiredQuestions[i] + "']")[0]) {
                            if(pendo.dom("._pendo-open-text-poll-wrapper[data-pendo-poll-id='" + requiredQuestions[i] + "'] textarea")[0].value == "") {
                                var allRequiredComplete = false;
                            }
                        }
                        if (pendo.dom("._pendo-number-scale-poll-wrapper[data-pendo-poll-id='" + requiredQuestions[i] + "']")[0]) {
                            if(!(pendo.dom("._pendo-number-scale-poll-wrapper[data-pendo-poll-id='" + requiredQuestions[i] + "']")[0].querySelector(':checked'))) {
                                var allRequiredComplete = false;
                            }
                        }
                        if (pendo.dom("._pendo-multi-choice-poll-select-border[data-pendo-poll-id='" + requiredQuestions[i] + "']")[0]) {
                            if(!(pendo.dom("._pendo-multi-choice-poll-select-border[data-pendo-poll-id='" + requiredQuestions[i] + "']")[0].querySelector(':checked'))) {
                                var allRequiredComplete = false;
                            }
                        }
                    }

                    if (allRequiredComplete) {
                        enableEligibleButtons(textForDisabledButtons);
                    } else {
                        disableEligibleButtons(textForDisabledButtons);
                    }
                }
            })
        });
                

        var config = {
            attributeFilter: ['data-layout'],
            attributes: true,
            childList: true,
            characterData: true,
            subtree: false
        };

        observer.observe(target, config);
    }

    addRequiredMutationListener();
}
