var branchingQuestions = [];
var branchingPollIds = [];
var textForBranchingButtons = ["Submit", "Next", "Finish"];

function branchingHTML(dataPendoPollId) {
    return '<div style="text-align:right; font-size: 10px; color: #cccccc; font-style: italic; margin-top: -10px;" class="branching-wrapper" name="' +  dataPendoPollId + '">* Branching</div>';
} 

function branchingErrorHTML(dataPendoPollId) {
    return '<div style="text-align:right; font-size: 10px; color: red; font-style: italic; margin-top: -10px;" class="branching-wrapper" name="' +  dataPendoPollId + '">* Branching Error: Multiple branching polls not supported</div>';
} 

// Only match elements inside this guide, so polls and buttons elsewhere on the page are not touched
function branchingInGuide(selector) {
    // This guide's own element. step.guideElement works for overlay and embedded guides; the fallback
    // matches any container ID that starts with pendo-guide-container (embedded guides add a suffix).
    var guideRoot = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
    return Array.prototype.filter.call(pendo.dom(selector), function(el) {
        return guideRoot && guideRoot.contains(el);
    });
}

//Execute in preview, staged, or production
if(!pendo.designerEnabled) {
    function initialBranchingSetup() {
        branchingQuestions = branchingInGuide("._pendo-multi-choice-poll-question:contains('[BRANCHING]')");
        
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
            var pollLabels = branchingInGuide("label[for*='" + dataPendoPollId + "']");
            var pollInputs = branchingInGuide('input[data-pendo-poll-id=' + dataPendoPollId + ']');

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

    branchingInGuide("input[data-pendo-poll-id]").forEach(input => {
        input.addEventListener("click", function() {
            addBranchingEventListener();
        })
    })

    function addBranchingEventListener() {
        var guideButtons = branchingInGuide("._pendo-button");
        var checkedPollInput = branchingInGuide('input.pendo-radio[data-pendo-poll-id]:checked')[0];
        if (!checkedPollInput) return;
        var checkedPollLabel = branchingInGuide('label[for="' + checkedPollInput.id + '"]')[0];
        if (!checkedPollLabel) return;
        var checkedPollLabelStepIndex = checkedPollLabel.getAttribute("goToStep");

        for (var i = 0; i < guideButtons.length; i++) {
            if(textForBranchingButtons.map(t => t.toLowerCase()).includes(guideButtons[i].innerText.toLowerCase()) && (checkedPollLabelStepIndex)) {
                let clone = guideButtons[i].cloneNode(true);
                let innerText = guideButtons[i].innerText;
                guideButtons[i].replaceWith(clone);
                // Attach to the clone that replaced this button (not the first button in the page)
                clone.addEventListener("click", branchingGoToStep);
            }
        }
    }

    function branchingGoToStep(event) {
        var checkedPollInput = branchingInGuide('input.pendo-radio[data-pendo-poll-id]:checked')[0];
        if (!checkedPollInput) return;
        var checkedPollLabel = branchingInGuide('label[for="' + checkedPollInput.id + '"]')[0];
        if (!checkedPollLabel) return;
        var checkedPollLabelStepIndex = checkedPollLabel.getAttribute("goToStep");

        var responses = [];
        var questions = branchingInGuide('[data-pendo-poll-id]');
        responses = responses.concat(pendo._.map(questions, function(question) {
            var input = pendo.Sizzle('textarea,input:text,select,input:radio:checked', question);
            if (input && input.length && input[0].value) {
                var pollId = question.getAttribute('data-pendo-poll-id');
                var curPoll = pendo._.find(step.guide.polls, function(poll) {
                    return poll.id === pollId;
                });
                var pollValue = input[0].value;
                if (curPoll && curPoll.numericResponses) {
                    pollValue = parseInt(pollValue, 10);
                }
                return {
                    'pollId': pollId,
                    'value':  pollValue
                };
            }
        }));

        if (step.response && responses) {
            step.response(pendo._.compact(responses));
            console.debug("Responses recorded")
        } else {
            console.debug('[Agent] Error! Trying to submit a poll response but step does not have response function!');
        }

        pendo.goToStep({destinationStepId: pendo.getActiveGuide().guide.steps[checkedPollLabelStepIndex-1].id})
    }
}

//Only executed when the Pendo Designer is open
if(pendo.designerEnabled) {                          
    var addBranchingMutationListener = function() {
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

    addBranchingMutationListener();
}
