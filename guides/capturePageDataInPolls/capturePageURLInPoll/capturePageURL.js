(function capturePageURL(step) {
	// This guide's own element. step.guideElement works for overlay and embedded guides; the fallback
	// matches any container ID that starts with pendo-guide-container (embedded guides add a suffix).
	var guideRoot = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
	if (!guideRoot) return;

	// Only look inside this guide for the [PAGE URL] question
	var pageUrlLabel = Array.prototype.filter.call(pendo.dom("._pendo-open-text-poll-question:contains('[PAGE URL]')"), function (el) {
		return guideRoot.contains(el);
	});
	if (!pageUrlLabel[0]) return;
	var pollId = pageUrlLabel[0].getAttribute("data-pendo-poll-id");
	var pageUrlTextBox = [guideRoot.querySelector("textarea[data-pendo-poll-id='" + pollId + "']")];
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
	guideRoot.addEventListener('click', updateHiddenTextBox, true);

	// Remove the listeners when the guide closes
	if (step && step.after) {
		step.after('teardown', function () {
			window.removeEventListener('popstate', updateHiddenTextBox);
			window.removeEventListener('hashchange', updateHiddenTextBox);
			guideRoot.removeEventListener('click', updateHiddenTextBox, true);
		});
	}
})(step);
