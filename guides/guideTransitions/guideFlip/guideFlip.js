(function (dom, guides) {
	var currentGuide = pendo.findGuideById(step.guideId);
	var currentStepIndex = pendo._.indexOf(currentGuide.steps, step);
	var currentStep = currentStepIndex + 1;
	var previousStep = sessionStorage.getItem('previous');
	var pendoContainer = document.getElementById('pendo-guide-container');
	var nextBtn = document.getElementById('next-btn');
	var prevBtn = document.getElementById('prev-btn');

	if (currentStep < previousStep) {
		pendoContainer.classList.toggle('flip-in-prev');
	} else {
		pendoContainer.classList.toggle('flip-in');
	}

	nextBtn.onclick = function () {
		pendoContainer.classList.toggle('flip');
		setTimeout(() => {
			pendo.onGuideAdvanced();
		}, 1300);
	};

	if (currentStepIndex == 0) {
		prevBtn.style.display = 'none';
	} else {
		prevBtn.onclick = function () {
			sessionStorage.setItem('previous', currentStep);
			pendoContainer.classList.toggle('flip-previous');
			setTimeout(() => {
				pendo.onGuidePrevious();
			}, 1300);
		};
	}
})(pendo.dom, pendo.guides);
