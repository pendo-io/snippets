var requiredQuestions = [];
var requiredPollIds = [];
var dependentButtons = [];
var textForDisabledButtons = ["Submit", "Next", "Finish"];
var isButtonDisabled = false;

function requiredHTML(dataPendoPollId) {
    return '<div class="required-wrapper" name="' +  dataPendoPollId + '">* Required</div>';
} 

function disableEligibleButtons(textForDisabledButtons) {
    for(var i=0; i < textForDisabledButtons.length; i++) {
        var eligibleButtons = pendo.dom("._pendo-button:contains('" + textForDisabledButtons[i] + "')");
        for (var k=0; k < eligibleButtons.length; k++) {
            eligibleButtons[i].disabled = true;
        }
    }
}

function enableEligibleButtons(textForDisabledButtons) {
    for(var i=0; i < textForDisabledButtons.length; i++) {
        var eligibleButtons = pendo.dom("._pendo-button:contains('" + textForDisabledButtons[i] + "')");
        for (var k=0; k < eligibleButtons.length; k++) {
            eligibleButtons[i].disabled = false;
        }
    }
}

if(!pendo.designerEnabled) {
    function processRequiredQuestions() {
        requiredQuestions = pendo.dom("._pendo-open-text-poll-question:contains('[REQUIRED]'), ._pendo-number-scale-poll-question:contains('[REQUIRED]'), ._pendo-multi-choice-poll-question:contains('[REQUIRED]')");
        for(i=0; i<requiredQuestions.length; i++) {
            var dataPendoPollId = requiredQuestions[i].getAttribute("data-pendo-poll-id");
            requiredPollIds.push(dataPendoPollId);
            if(pendo.dom("._pendo-multi-choice-poll-select-border[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0]) {
                pendo.dom("._pendo-multi-choice-poll-select-border[data-pendo-poll-id='" + requiredPollIds[i] + "']")[0].parentElement.parentElement.insertAdjacentHTML('afterEnd', requiredHTML(dataPendoPollId));
            } else {
                pendo.dom(".pendo-block-wrapper[data-pendo-poll-id='" + dataPendoPollId + "']")[0].parentElement.parentElement.insertAdjacentHTML('afterEnd', requiredHTML(dataPendoPollId));
            }
            requiredQuestions[i].innerText = requiredQuestions[i].innerText.replace("[REQUIRED]", "");
        }
        if(requiredPollIds.length>0) {
            disableEligibleButtons(textForDisabledButtons);
        }
    }

    processRequiredQuestions();
    pendo.dom("#pendo-guide-container")[0].addEventListener("click", function(){
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
                }
            }
        }

        if (allRequiredComplete) {
            enableEligibleButtons(textForDisabledButtons);
        } else {
            disableEligibleButtons(textForDisabledButtons);
        }
    });

}

if(pendo.designerEnabled) {                          
    addRequiredMutationListener = function() {
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

                        var questionText = "";
                        if(pendo.dom("._pendo-open-text-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0]) {
                            questionText = pendo.dom("._pendo-open-text-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0].innerText;
                        }
                        if(pendo.dom("._pendo-number-scale-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0]) {
                            questionText = pendo.dom("._pendo-number-scale-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0].innerText;
                        }
                        if(pendo.dom("._pendo-multi-choice-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0]) {
                            questionText = pendo.dom("._pendo-multi-choice-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0].innerText;
                        }                           
        		        

                        if(questionText.includes("[REQUIRED]")){
                            mutation.addedNodes[0].insertAdjacentHTML('afterEnd', requiredHTML(dataPendoPollId));
                            if(requiredQuestions.includes(dataPendoPollId)) {
                                var index = requiredQuestions.indexOf(dataPendoPollId);
                                if (index !== -1) {
                                    requiredQuestions.splice(index, 1);
                                }
                            } else {
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
