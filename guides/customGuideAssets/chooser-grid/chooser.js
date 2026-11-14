// terrible awful choice to prevent the guide from showing to safari users
// the background gradients look awful and need to be fixed before this can be removed
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) { pendo.onGuideDismissed(); }

(function(dom, guides) {
    // Track whether this snippet added the page scroll lock, so a lock that the host
    // app already set (Bootstrap also uses "modal-open" for its own modals) is left alone
    var ownsScrollLock = false;
    function lockPageScroll() {
        if (!document.body.classList.contains('modal-open')) {
            dom('body').addClass('modal-open');
            ownsScrollLock = true;
        }
    }
    function releasePageScroll() {
        if (ownsScrollLock) {
            dom('body').removeClass('modal-open');
            ownsScrollLock = false;
        }
    }

    if (!pendo.designerEnabled) {
        lockPageScroll();
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
                    releasePageScroll();
                }

                if (advanceButton.length) {
                    // Check the destination first, so the cards aren't faded out for a guide that can't open
                    var nextGuide = pendo.findGuideById(id);
                    if (!nextGuide) return; // guide ID missing or not eligible for this visitor

                    pendo.dom('._pendo-guide-cards-container_').addClass('_pendo-card-fade-out_');

                    var firstStep = nextGuide.steps[0];
                    firstStep.navigation_animation = '_pendo-card-fade-in_';

                    pendo._.delay(function() {
                            pendo.onGuideDismissed();
                            pendo.showGuideById(id);
                    }, 350);
                }
            });
        });
    })(step, guide);

    // Always release this snippet's page scroll lock when the guide closes, however it closes
    step && step.after('teardown', function () {
        releasePageScroll();
    });
}(pendo.dom, pendo.guides));