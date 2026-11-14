(function capturePageURL(step) {
	// Only look inside this guide for the [PAGE URL] question
	var pageUrlLabel = pendo.dom("#pendo-guide-container ._pendo-open-text-poll-question:contains('[PAGE URL]')");
	if (!pageUrlLabel[0]) return;
	var pollId = pageUrlLabel[0].getAttribute("data-pendo-poll-id");
	var pageUrlTextBox = pendo.dom("#pendo-guide-container textarea[data-pendo-poll-id='" + pollId + "']");
	if (!pageUrlTextBox[0]) return;

	if (!pendo.designerEnabled) {
		var row = pageUrlTextBox[0].closest("._pendo-row");
		if (row) row.style.display = "none";
		pageUrlLabel[0].style.display = "none";
	}

	function updateHiddenTextBox() {
		pageUrlTextBox[0].innerText = window.location.href;
	}

	updateHiddenTextBox();

	// Keep the value current on single-page app navigation ("locationchange" is not a browser event)
	window.addEventListener('popstate', updateHiddenTextBox);
	window.addEventListener('hashchange', updateHiddenTextBox);

	// history.pushState() and replaceState() fire no event, so also refresh the value on any
	// click inside the guide. The capture phase runs before Pendo's own submit handler.
	var guideRoot = (step && step.guideElement && step.guideElement[0]) || document.getElementById("pendo-guide-container");
	if (guideRoot) guideRoot.addEventListener('click', updateHiddenTextBox, true);

	// Remove the listeners when the guide closes
	if (step && step.after) {
		step.after('teardown', function () {
			window.removeEventListener('popstate', updateHiddenTextBox);
			window.removeEventListener('hashchange', updateHiddenTextBox);
			if (guideRoot) guideRoot.removeEventListener('click', updateHiddenTextBox, true);
		});
	}
})(step);
