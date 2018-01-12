(function(dom, guides) {
  var currentGuide = pendo.findGuideById(step.guideId);
  var currentStepIndex = pendo._.indexOf(currentGuide.steps, step);
  var currentStep = currentGuide.steps[currentStepIndex];
  var nextStepIndex = currentStepIndex + 1;
  var nextStep = currentGuide.steps[nextStepIndex];
  var prevStepIndex = currentStepIndex - 1;
  var prevStep = currentGuide.steps[prevStepIndex];
  var firstStep = pendo._.first(currentGuide && currentGuide.steps);
  var firstStepIndex = pendo._.indexOf(currentGuide.steps, firstStep);
  var lastStep = pendo._.last(currentGuide && currentGuide.steps);
  var lastStepIndex = pendo._.indexOf(currentGuide.steps, lastStep);
  var totalSteps = currentGuide.getTotalSteps();

  var cardAnimation = currentStep.card_animation || '';
  var navigationAnimation = currentStep.navigation_animation || '';
  var slideRightOut = '_pendo-card-slide-right-out_';
  var slideRightIn = '_pendo-card-slide-right-in_';
  var slideLeftOut = '_pendo-card-slide-left-out_';
  var slideLeftIn = '_pendo-card-slide-left-in_';
  var fadeOut = '_pendo-card-fade-out_';
  var fadeIn = '_pendo-card-fade-in_';

  buildCarouselNavigation();
  toggleActiveStepContent();

  function buildCarouselNavigation() {
    var card = dom('._pendo-guide-card_');
    var indicators = dom('<ul/>')
      .addClass('_pendo-guide-step-indicators_')
      .appendTo(card);
      
    var indicator;
    var i = 0;
    var fragment = document.createDocumentFragment();

    while (i < totalSteps) {
      indicator = dom('<li/>')
        .addClass('step-indicator')
        .attr('data-index', i);

      if (i === currentStepIndex) {
        indicator.addClass('active');
      }
      
      fragment.appendChild(indicator);
      i++;
    }
    indicators.append(fragment);
  }

  function toggleActiveStepContent() {
    dom('._pendo-guide-card-content_').addClass(cardAnimation);
    dom('._pendo-guide-arrow-wrapper_, ._pendo-guide-step-indicators_, ._pendo-guide-back-to-main_').addClass(navigationAnimation);

    if (pendo.isGuideShown()) {
      dom('body').addClass('modal-open')
    }
  }

  (function wireGuideNavigation(step) {
    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
      var dismissButton = dom(e.target || e.srcElement).closest('._pendo-close-guide_');
      var advanceButton = dom(e.target || e.srcElement).closest('._pendo-guide-next-arrow_');
      var previousButton = dom(e.target || e.srcElement).closest('._pendo-guide-previous-arrow_');
      var backToMain = dom(e.target || e.srcElement).closest('._pendo-guide-back-to-main_');
      var takeMeButton = dom(e.target || e.srcElement).closest('._pendo-guide-takeme-wrapper_');

      var destinationButton = dom(eventTarget(e)).closest('.step-indicator');
      var destinationIndex = destinationButton.attr('data-index');
      var guideContent = dom('._pendo-guide-card-content_');

      if (dismissButton.length) {
        dom('body').removeClass('modal-open');
      }

      if (advanceButton.length) {
        guideContent.removeClass(cardAnimation);
        guideContent.addClass(slideLeftOut);

        if (currentStepIndex === lastStepIndex) {
          dom('._pendo-guide-card-grid_, ._pendo-guide-arrow-wrapper_').addClass(fadeOut);
          pendo._.delay(function() {
            pendo.onGuideDismissed();
          }, 350);
        } else {
          destinationStep = guide.steps[nextStepIndex];
          destinationStep.card_animation = slideRightIn;
          currentStep.navigation_animation = '';
          pendo._.delay(function() {
            pendo.onGuideAdvanced();
          }, 350);
        }
      }


      if (previousButton.length) {
        guideContent.removeClass(cardAnimation);
        guideContent.addClass(slideRightOut);

        if (currentStepIndex === firstStepIndex) {
          dom('._pendo-guide-arrow-wrapper_').removeClass(fadeIn);
          dom('._pendo-guide-card-grid_, ._pendo-guide-arrow-wrapper_').addClass(fadeOut);
          pendo._.delay(function() {
            pendo.onGuideDismissed();
          }, 350);
        } else {
          destinationStep = guide.steps[prevStepIndex];
          destinationStep.card_animation = slideLeftIn;
          currentStep.navigation_animation = '';
          pendo._.delay(function() {
            pendo.onGuidePrevious();
          }, 350);
        }
      }

      if (destinationButton.length && currentStepIndex !== destinationIndex) {
        guideContent.removeClass(cardAnimation);

        if (currentStepIndex > destinationIndex) {
          destinationStepIndex = destinationIndex + 1;
          guideContent.addClass(slideRightOut);
          destinationStep = guide.steps[destinationIndex];
          destinationStep.card_animation = slideLeftIn;
          currentStep.navigation_animation = '';
          pendo._.delay(function() {
            pendo.onGuidePrevious(guide.steps[destinationStepIndex]);
          }, 350);

        } else if (currentStepIndex < destinationIndex) {
          destinationStepIndex = destinationIndex - 1;
          guideContent.addClass(slideLeftOut);
          destinationStep = guide.steps[destinationIndex];
          destinationStep.card_animation = slideRightIn;
          currentStep.navigation_animation = '';
          pendo._.delay(function() {
            pendo.onGuideAdvanced(guide.steps[destinationStepIndex]);
          }, 350);
        }
      }
    });
  })(step, guide);
}(pendo.dom, pendo.guides));