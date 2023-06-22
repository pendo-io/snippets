// Checkboxes
//
// PRE-REQUISITES: This requires there to be exactly one radio button poll
// created through the designer, and then an open text poll that contains
// the placeholder text "hidden box".
// 
// Instructions Doc here:
// https://docs.google.com/document/d/1SQRBTcUgKoz5CgiH9VIHc7u0QDhYgnM2s6IZThnOSY4/edit


var radios = pendo.dom('input[type="radio"]');
pendo._.each(radios, function(radio) {
  radio.type="checkbox"
});

var hiddenBox = pendo.dom('._pendo-open-text-poll-input[placeholder="hidden box"');
if(!pendo.designerEnabled) {
  hiddenBox[0].parentElement.parentElement.parentElement.parentElement.style.display = "none";
}

var chkArray = [];
pendo.dom('input[type="checkbox"]').on("click", 'input[type="checkbox"]', function(e) {
  var labelName = e.target.id;
  var label = pendo.dom('label[for="'+labelName+'"]')[0].innerText;
  
  if (!chkArray.includes(label)) {
  	chkArray.push(label);
  } else {
  	var index = chkArray.indexOf(label);
	if (index !== -1) chkArray.splice(index, 1);
  }

  hiddenBox[0].innerText = chkArray.join(",");
});
