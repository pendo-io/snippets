var pollId = pendo.dom("._pendo-open-text-poll-question:contains('[PAGE URL]')")[0].getAttribute("data-pendo-poll-id");
var pageUrlTextBox = pendo.dom("textarea[data-pendo-poll-id='"+ pollId + "']");
var pageUrlLabel = pendo.dom("._pendo-open-text-poll-question:contains('[PAGE URL]')");

if (!pendo.designerEnabled) {
	pageUrlTextBox[0].parentElement.parentElement.parentElement.style.display = "none";
	pageUrlLabel[0].style.display = "none";
}

function updateHiddenTextBox() {
	pageUrlTextBox[0].innerText = window.location.href;
}

updateHiddenTextBox();
window.addEventListener('locationchange', function(){
    updateHiddenTextBox();
})