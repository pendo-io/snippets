// Checkboxes
//
// PRE-REQUISITES: This requires there to be exactly one radio button poll
// created through the designer, and then an open text poll that contains
// the question header text "[hidden]".
//

var radios = pendo.dom('input[type="radio"]');
pendo._.each(radios, function(radio) {
  radio.type="checkbox"
});

var hiddenPollId = pendo.dom('[data-pendo-poll-id]:contains("[hidden]")')[0].attributes["data-pendo-poll-id"].value;
var hiddenTextBox = pendo.dom("textarea[data-pendo-poll-id=" + hiddenPollId + "]")[0];

if(!pendo.designerEnabled) {
  pendo.dom("#pendo-guide-container")[0].style.opacity = 0;
  hiddenElements = pendo.dom("[data-pendo-poll-id=" + hiddenPollId + "]");
  setTimeout(() => {
        for (var key of Object.keys(hiddenElements)) {
            if (hiddenElements[key] && hiddenElements[key].tagName) {
                hiddenElements[key].style.display = "none";
            }
        }
    }, 50);
}

var chkArray = [];
pendo.dom('input').on("click", 'input[type="checkbox"]', function(e) {
    var labelName = e.target.id;
    var label = pendo.dom('label[for="'+labelName+'"]')[0].innerText; 

    if (!chkArray.includes(label)) {
        chkArray.push(label);
    } else {
        var index = chkArray.indexOf(label);
        if (index !== -1) chkArray.splice(index, 1);
    }

    console.log("hit it");
    hiddenTextBox.innerText = chkArray.join(",");
});

setTimeout(() => {
    pendo.dom("#pendo-guide-container")[0].style.opacity = 1;
    pendo.flexElement(pendo.dom('#pendo-guide-container')[0]);
}, 50);
