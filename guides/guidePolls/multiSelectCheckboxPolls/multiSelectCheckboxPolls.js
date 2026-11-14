// Checkboxes
//
// PRE-REQUISITES: This requires there to be exactly one radio button poll
// created through the designer, and then an open text poll that contains
// the question header text "[hidden]".
//
(function multiSelectCheckboxPolls(step, guide) {
    // Only look inside this guide, so radio buttons in the host app or in other guides are left alone
    var guideRoot = (step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
    if (!guideRoot) return;

    function inGuide(selector) {
        return Array.prototype.filter.call(pendo.dom(selector), function(el) {
            return guideRoot.contains(el);
        });
    }

    var guideContainerSelector = "[id^=pendo-guide-container]"; // flexible for overlay and embed guides
    var containerSelectorId = `pendo-g-${guide.id}`;
    var guideContainer = inGuide(guideContainerSelector)[0] || guideRoot;

    var hiddenQuestion = inGuide('[data-pendo-poll-id]:contains("[hidden]")')[0];
    if (!hiddenQuestion) {
        console.warn('multiSelectCheckboxPolls: no open text poll with the text "[hidden]" was found in this guide.');
        return;
    }
    var hiddenPollId = hiddenQuestion.getAttribute("data-pendo-poll-id");
    var hiddenTextBox = inGuide("textarea[data-pendo-poll-id=" + hiddenPollId + "]")[0];

    pendo._.each(inGuide('input[type="radio"]'), function(radio) {
        radio.type = "checkbox";
    });

    if (!pendo.designerEnabled) {
        guideContainer.style.opacity = 0;
        var hiddenElements = inGuide("[data-pendo-poll-id=" + hiddenPollId + "]");
        setTimeout(function() {
            hiddenElements.forEach(function(el) {
                el.style.display = "none";
            });
        }, 50);
    }

    // Listen on the guide itself rather than on every input on the page
    var chkArray = [];
    guideRoot.addEventListener("click", function(e) {
        var input = e.target;
        if (!input || input.tagName !== "INPUT" || input.type !== "checkbox") return;

        var labelElement = guideRoot.querySelector('label[for="' + input.id + '"]');
        if (!labelElement) return;
        var label = labelElement.innerText;

        if (!chkArray.includes(label)) {
            chkArray.push(label);
        } else {
            var index = chkArray.indexOf(label);
            if (index !== -1) chkArray.splice(index, 1);
        }

        if (hiddenTextBox) {
            hiddenTextBox.innerText = chkArray.join(",");
        }
    });

    setTimeout(function() {
        var actualHeight = pendo.dom(guideContainerSelector).height();
        var heightWithPx = `${actualHeight}px`;
        pendo.dom(containerSelectorId).css({ height: heightWithPx });
        guideContainer.style.opacity = 1;
        var flexTarget = inGuide("#pendo-guide-container")[0];
        if (flexTarget) {
            pendo.flexElement(flexTarget);
        }
    }, 50);
})(step, guide);
