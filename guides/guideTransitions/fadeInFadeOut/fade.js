(function (dom, guides) {
	var currentGuide = pendo.findGuideById(step.guideId);
	var currentStepIndex = pendo._.indexOf(currentGuide.steps, step);
	var pendoContainer = document.getElementById('pendo-guide-container');
	var nextBtn = document.getElementById('next-btn');
	var prevBtn = document.getElementById('prev-btn');

	nextBtn.onclick = function () {
		pendoContainer.classList.toggle('fade-out');
		setTimeout(() => {
			pendo.onGuideAdvanced();
		}, 1000);
	};

	if (currentStepIndex == 0) {
		prevBtn.style.display = 'none';
	} else {
		prevBtn.onclick = function () {
			pendoContainer.classList.toggle('fade-out');
			setTimeout(() => {
				pendo.onGuidePrevious();
			}, 1000);
		};
	}
})(pendo.dom, pendo.guides);
