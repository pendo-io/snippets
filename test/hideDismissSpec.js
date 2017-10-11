'use strict';

// Create steps for the Guide
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
        // Create an object providing the steps defined above
        this.HIDE_OR_DISMISS = {
            'id': 'guide1',
            'name': 'Hide or Dismiss',
            'isMultiStep': false,
            'launchMethod': 'auto',
            'steps': hideDismiss
        };

        // Watch the FrameController Object and return true when isInThisFrame is executed
        spyOn(FrameController, 'isInThisFrame').and.returnValue(true);
    });

    afterEach(function () {
        // Clean up after each execution
        stopGuides();
        clearLoopTimer();
    });

    describe('#hideDismiss', function () {
        beforeEach(function () {
            activeGuides = [];
            pendo.lastGuideStepSeen = {};
            
            // Set local context with HIDE_OR_DISMISS object
            var HIDE_OR_DISMISS = this.HIDE_OR_DISMISS;

            // Watch our guide API functions
            spyOn(window, 'dismissedGuide');
            spyOn(window, '_updateGuideStepStatus');

            // Provide the HIDE_OR_DISMISS object to the agent and let GuideFactory set Guide attributes
            // GuideFactory will return a guide object
            activeGuides = _.map([this.HIDE_OR_DISMISS], GuideFactory);
            this.step = activeGuides[0].steps[0];

            // Add our elements to the DOM
            setFixtures('<input id="input" class="test-success _pendo-required_">Hello Gubnor!</input>');

            // Agent expects a lastGuideStepSeen. Set to our first step
            window.lastGuideStepSeen = this.step.id;
            startGuides();
        });

        afterEach(function () {
             // Clean up after each execution
            stopGuides();
            clearLoopTimer();
        });

        it('Should display a guide and dismiss completely', function () {
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);
            var dismiss = document.getElementsByClassName('pendo-close-button');
            var checkbox = document.getElementsByClassName('pendo-never-show-again');

            // Execute click event on our elements
            checkbox[0].click();
            dismiss[0].click();

            // Validate our guide is dismissed
            expect(dismissedGuide).toHaveBeenCalled();
            // stayHidden is used to determine whether a guide can show again
            // Validate stayHidden is not set
            expect(step.attributes.stayHidden).toBe(undefined);
        });

        it('Should display a guide and dismiss until reload', function () {
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);
            var dismiss = document.getElementsByClassName('pendo-close-button');

            // Execute click event on our element
            dismiss[0].click();

            // Validate our guide is dismissed
            expect(dismissedGuide).not.toHaveBeenCalled();
            // Validate stayHidden is set
            expect(step.attributes.stayHidden).toBe(true);
        });
    });
});
