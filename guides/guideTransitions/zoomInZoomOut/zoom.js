(function (dom, guides) {
	var currentGuide = pendo.findGuideById(step.guideId);
	var currentStepIndex = pendo._.indexOf(currentGuide.steps, step);
	var guideRoot = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
	if (!guideRoot) return;
	// Embedded guides use a suffixed container id, so match by prefix
	var pendoContainer = guideRoot.querySelector('[id^="pendo-guide-container"]') || guideRoot;
	var nextBtn = guideRoot.querySelector('#next-btn');
	var prevBtn = guideRoot.querySelector('#prev-btn');
	var isNavigating = false;
	var navTimer = null;

	// Runs the exit animation once, then navigates; later clicks are ignored
	function navigate(navFn) {
		if (isNavigating) return;
		isNavigating = true;
		if (nextBtn) nextBtn.disabled = true;
		if (prevBtn) prevBtn.disabled = true;
		pendoContainer.classList.toggle('zoom-out');
		navTimer = setTimeout(function () {
			navTimer = null;
			navFn();
		}, 1000);
	}

	if (typeof step.after === 'function') {
		step.after('teardown', function () {
			if (navTimer) clearTimeout(navTimer);
			navTimer = null;
		});
	}

	if (nextBtn) {
		nextBtn.onclick = function () {
			navigate(function () {
				pendo.onGuideAdvanced();
			});
		};
	}

	if (prevBtn) {
		if (currentStepIndex == 0) {
			prevBtn.style.display = 'none';
		} else {
			prevBtn.onclick = function () {
				navigate(function () {
					pendo.onGuidePrevious();
				});
			};
		}
	}
})(pendo.dom, pendo.guides);
