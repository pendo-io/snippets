'use strict';

var hideDismiss = [
    {
        'id': 'step1',
        'guideId': 'guide1',
        'type': 'tooltip',
        'elementPathRule': '#input',
        'content': [
            '<div>test content</div>',
            '<p><span class="guide-header-text">Sample Header</span></p><p><span>Step 1</span></p>',
            '<input type="checkbox" class="pendo-never-show-again">Never Show Again</input>',
            '<button class="pendo-close-button">Close</button>',
            '<script id="pendo-inline-script">',
            '<% if (typeof guide !== "undefined") { %>',
            'var guide = pendo.findGuideById("<%= guide.id %>");',
            'var step = guide && guide.findStepById("<%= step.id %>");',
            '<% } %>',
            '(function wireHideOrDismiss(step) {',
            'step && step.attachEvent(step.guideElement[0], "click", function hideOrDismiss(e) {',
            'if (!checkClickTarget(e, ".pendo-close-button")) {',
            'if (pendo.Sizzle(".pendo-never-show-again")[0].checked) {',
            'pendo.onGuideDismissed();',
            '} else {',
            'pendo.onGuideDismissed({until: "reload"});',
            '}',
            '}',
            '});',
            'function checkClickTarget (e, elem) {',
            'return pendo.dom(e.target || e.srcElement).closest(elem).length === 0;',
            '}',
            '})(step, guide);',
            '</script>'
        ].join('\n')
    }
];

describe('Hide or Dismiss Service Snippet', function () {
    beforeEach(function () {
        this.HIDE_OR_DISMISS = {
            'id': 'guide1',
            'name': 'Hide or Dismiss',
            'isMultiStep': false,
            'launchMethod': 'auto',
            'steps': hideDismiss
        };

        spyOn(FrameController, 'isInThisFrame').and.returnValue(true);
    });

    afterEach(function () {
        stopGuides();
        clearLoopTimer();
    });

    describe('#hideDismiss', function () {
        beforeEach(function () {
            activeGuides = [];
            pendo.lastGuideStepSeen = {};

            var HIDE_OR_DISMISS = this.HIDE_OR_DISMISS;

            spyOn(window, 'dismissedGuide');
            spyOn(window, '_updateGuideStepStatus');

            activeGuides = _.map([this.HIDE_OR_DISMISS], GuideFactory);
            this.step = activeGuides[0].steps[0];

            setFixtures('<input id="input" class="test-success _pendo-required_">Hello Gubnor!</input>');

            window.lastGuideStepSeen = this.step.id;
            startGuides();
        });

        afterEach(function () {
            stopGuides();
            clearLoopTimer();
        });

        it('Should display a guide and dismiss completely', function () {
            expect(isGuideShown()).toBe(true);
            var dismiss = document.getElementsByClassName('pendo-close-button');
            var checkbox = document.getElementsByClassName('pendo-never-show-again');

            checkbox[0].click();
            dismiss[0].click();

            expect(dismissedGuide).toHaveBeenCalled();
            expect(step.attributes.stayHidden).toBe(undefined);
        });

        it('Should display a guide and dismiss until reload', function () {
            expect(isGuideShown()).toBe(true);
            var dismiss = document.getElementsByClassName('pendo-close-button');

            dismiss[0].click();

            expect(dismissedGuide).not.toHaveBeenCalled();
            expect(step.attributes.stayHidden).toBe(true);
        });
    });
});
