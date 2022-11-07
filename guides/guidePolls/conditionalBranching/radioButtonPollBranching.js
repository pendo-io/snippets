var branchingQuestions = [];
var branchingPollIds = [];
var textForBranchingButtons = ["Submit", "Next", "Finish"];

function branchingHTML(dataPendoPollId) {
    return '<div style="text-align:right; font-size: 10px; color: #cccccc; font-style: italic; margin-top: -10px;" class="branching-wrapper" name="' +  dataPendoPollId + '">* Branching</div>';
} 

function branchingErrorHTML(dataPendoPollId) {
    return '<div style="text-align:right; font-size: 10px; color: red; font-style: italic; margin-top: -10px;" class="branching-wrapper" name="' +  dataPendoPollId + '">* Branching Error: Multiple branching polls not supported</div>';
} 

//Execute in preview, staged, or production
if(!pendo.designerEnabled) {
    function initialBranchingSetup() {
        branchingQuestions = pendo.dom("._pendo-multi-choice-poll-question:contains('[BRANCHING]')");
        
        if(branchingQuestions.length > 1) {
            console.log("Multiple guide questions marked as branching within same step; exiting guide.")
            pendo.onGuideDismissed();
        }

        if(branchingQuestions.length == 1) {
            var selectedInput = "";
            var gotoSubstring = "";
            var gotoIndex = "";

            var dataPendoPollId = branchingQuestions[0].getAttribute("data-pendo-poll-id");
            branchingQuestions[0].innerText = branchingQuestions[0].innerText.replace("[BRANCHING]", "");
            var pollLabels = pendo.dom("label[for*='" + dataPendoPollId + "']");
            var pollInputs = pendo.dom('input[data-pendo-poll-id=' + dataPendoPollId + ']');

            for(var i=0; i < pollLabels.length; i++) {
                gotoSubstring = pollLabels[i].innerText.substring(0, pollLabels[i].innerText.indexOf(']')+1);
                gotoIndex = pollLabels[i].innerText.substring(pollLabels[i].innerText.indexOf("[GOTO-") + 6, pollLabels[i].innerText.lastIndexOf("]"));
                if(gotoSubstring) {
                    pollLabels[i].setAttribute("goToStep", gotoIndex);
                    pollLabels[i].innerText = pollLabels[i].innerText.replace(gotoSubstring, "").trim();
                }
            }
        }
    }

    initialBranchingSetup();

    document.querySelectorAll("input[data-pendo-poll-id]").forEach(input => {
        input.addEventListener("click", function() {
            addBranchingEventListener();
        })
    })

    function addBranchingEventListener() {
        var guideButtons = pendo.dom("._pendo-button");
        var checkedPollInputId = pendo.dom('input.pendo-radio[data-pendo-poll-id]:checked')[0].id;
        var checkedPollLabel = pendo.dom('label[for="' + checkedPollInputId + '"]')[0];
        var checkedPollLabelStepIndex = checkedPollLabel.getAttribute("goToStep");

        for (i = 0; i < guideButtons.length; i++) {
            if(textForBranchingButtons.map(t => t.toLowerCase()).includes(guideButtons[i].innerText.toLowerCase()) && (checkedPollLabelStepIndex)) {
                let clone = guideButtons[i].cloneNode(true);
                let innerText = guideButtons[i].innerText;
                guideButtons[i].replaceWith(clone);
                pendo.dom("._pendo-button")[0].addEventListener("click", branchingGoToStep);
            }
        }
    }

    function branchingGoToStep(event) {
        var checkedPollInputId = pendo.dom('input.pendo-radio[data-pendo-poll-id]:checked')[0].id;
        var checkedPollLabel = pendo.dom('label[for="' + checkedPollInputId + '"]')[0];
        var checkedPollLabelStepIndex = checkedPollLabel.getAttribute("goToStep");
        pendo.goToStep({destinationStepId: pendo.getActiveGuide().guide.steps[checkedPollLabelStepIndex-1].id})
    }
}

//Only executed when the Pendo Designer is open
if(pendo.designerEnabled) {                          
    addRequiredMutationListener = function() {
        var target = document.querySelector('#pendo-guide-container');

        // create an observer instance
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    // Add requiredToggle if new Open Text Poll is added
                    if(mutation.addedNodes[0].querySelector("._pendo-multi-choice-poll-select-border")) {
                        if(pendo.dom("._pendo-multi-choice-poll-question:contains('[BRANCHING]')").length > 1) {
                            mutation.addedNodes[0].insertAdjacentHTML('afterEnd', branchingErrorHTML(dataPendoPollId)); // errors out if multiple branching snippets implemented
                        } else {
                            var dataPendoPollId = mutation.addedNodes[0].querySelector("._pendo-multi-choice-poll-select-border").getAttribute("data-pendo-poll-id");

                            var questionText = "";
                            if(pendo.dom("._pendo-multi-choice-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0]) {
                                questionText = pendo.dom("._pendo-multi-choice-poll-question[data-pendo-poll-id=" + dataPendoPollId + "]")[0].innerText;
                            }                           
                            
                            if(questionText.includes("[BRANCHING]")){
                                mutation.addedNodes[0].insertAdjacentHTML('afterEnd', branchingHTML(dataPendoPollId));
                            }

                            var pollLabels = pendo.dom("label[for*='" + dataPendoPollId + "']");
                            var maxIndex = "";
                            var gotoSubstring = "";
                            var endOfSubstringIndex = "";

                            for(i = 0; i < pollLabels.length; i++) {
                                if(pollLabels[i].innerText.includes("GOTO")) {
                                    if(/\[GOTO-[0-9]+]/.test(pollLabels[i].innerText)) {
                                        pollLabels[i].style.color = "green";
                                        pollLabels[i].style.fontStyle = "italic"; 
                                    } else {
                                        pollLabels[i].style.color = "red";
                                        pollLabels[i].style.fontWeight = "700";
                                    }
                                }
                            }
                        } 
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

