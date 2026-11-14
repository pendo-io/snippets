(function (dom, guides) {
	var currentGuide = pendo.findGuideById(step.guideId);
	var currentStepIndex = pendo._.indexOf(currentGuide.steps, step);
	var currentStep = currentStepIndex + 1;
	// Namespaced per guide and cleared after reading, so a stale value never sets the direction
	var previousKey = 'previous-' + currentGuide.id;
	var previousStep = Number(sessionStorage.getItem(previousKey)) || 0;
	sessionStorage.removeItem(previousKey);
	var guideRoot = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
	if (!guideRoot) return;
	// Embedded guides use a suffixed container id, so match by prefix
	var pendoContainer = guideRoot.querySelector('[id^="pendo-guide-container"]') || guideRoot;
	var nextBtn = guideRoot.querySelector('#next-btn');
	var prevBtn = guideRoot.querySelector('#prev-btn');
	var isNavigating = false;
	var navTimer = null;

	if (currentStep < previousStep) {
		pendoContainer.classList.toggle('flip-in-prev');
	} else {
		pendoContainer.classList.toggle('flip-in');
	}

	// Runs the exit animation once, then navigates; later clicks are ignored
	// rememberDirection: store this step so the next step can pick its entry animation.
	// It's false when there is no next step to read it (Next on the last step).
	function navigate(animationClass, navFn, rememberDirection) {
		if (isNavigating) return;
		isNavigating = true;
		if (nextBtn) nextBtn.disabled = true;
		if (prevBtn) prevBtn.disabled = true;
		if (rememberDirection) {
			sessionStorage.setItem(previousKey, currentStep);
		} else {
			sessionStorage.removeItem(previousKey);
		}
		pendoContainer.classList.toggle(animationClass);
		navTimer = setTimeout(function () {
			navTimer = null;
			navFn();
		}, 1300);
	}

	if (typeof step.after === 'function') {
		step.after('teardown', function () {
			if (navTimer) {
				// The step closed before navigating, so no step will read the stored direction
				clearTimeout(navTimer);
				sessionStorage.removeItem(previousKey);
			}
			navTimer = null;
		});
	}

	if (nextBtn) {
		nextBtn.onclick = function () {
			navigate('flip', function () {
				pendo.onGuideAdvanced();
			}, currentStepIndex < currentGuide.steps.length - 1);
		};
	}

	if (prevBtn) {
		if (currentStepIndex == 0) {
			prevBtn.style.display = 'none';
		} else {
			prevBtn.onclick = function () {
				navigate('flip-previous', function () {
					pendo.onGuidePrevious();
				}, true);
			};
		}
	}
})(pendo.dom, pendo.guides);
