(function (dom, guides) {
	var currentGuide = pendo.findGuideById(step.guideId);
	var currentStepIndex = pendo._.indexOf(currentGuide.steps, step);
	var currentStep = currentStepIndex + 1;
	var previousStep = sessionStorage.getItem('previous');
	var pendoContainer = document.getElementById('pendo-guide-container');
	var nextBtn = document.getElementById('next-btn');
	var prevBtn = document.getElementById('prev-btn');

	if (currentStep < previousStep) {
		pendoContainer.classList.toggle('slide-in-right');
	} else {
		pendoContainer.classList.toggle('slide-in-left');
	}

	nextBtn.onclick = function () {
		pendoContainer.classList.toggle('slide-out-right');
		setTimeout(() => {
			pendo.onGuideAdvanced();
		}, 1000);
	};

	if (currentStepIndex == 0) {
		prevBtn.style.display = 'none';
	} else {
		prevBtn.onclick = function () {
			sessionStorage.setItem('previous', currentStep);
			pendoContainer.classList.toggle('slide-out-left');
			setTimeout(() => {
				pendo.onGuidePrevious();
			}, 1000);
		};
	}
})(pendo.dom, pendo.guides);
