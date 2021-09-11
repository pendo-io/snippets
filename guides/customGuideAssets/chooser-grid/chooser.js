// terrible awful choice to prevent the guide from showing to safari users
// the background gradients look awful and need to be fixed before this can be removed
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) { pendo.onGuideDismissed(); }

(function(dom, guides) {
    if (!pendo.designer) {
        dom('body').addClass('modal-open')   
    }
    
    (function wireNextGuideButton(step) {
        step && step.attachEvent(step.guideElement[0], 'click', function(e) {
            var guides = {
                valueDriverOne: '',// Place guide id between the quotation marks
                valueDriverTwo: '',// Place guide id between the quotation marks
                valueDriverThree: '',// Place guide id between the quotation marks
                valueDriverFour: ''// Place guide id between the quotation marks
            };

            pendo._.each(guides, function(id, name) {
                var advanceButton = pendo.dom(e.target || e.srcElement).closest('.' + name);
                var dismissButton = dom(e.target || e.srcElement).closest('._pendo-close-guide_');

                if (dismissButton.length) {
                    dom('body').removeClass('modal-open');
                }

                if (advanceButton.length) {
                    pendo.dom('._pendo-guide-cards-container_').addClass('_pendo-card-fade-out_');

                    firstStep = pendo.findGuideById(id).steps[0];
                    firstStep.navigation_animation = '_pendo-card-fade-in_';

                    pendo._.delay(function() {
                            pendo.onGuideDismissed();
                            pendo.showGuideById(id);
                    }, 350);
                }
            });
        });
    })(step, guide);
}(pendo.dom, pendo.guides));