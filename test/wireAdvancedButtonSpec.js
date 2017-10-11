'use strict';

// Create steps for the Guide
var wireAdvanced = [
    {
        'id': 'step1',
        'guideId': 'guide1',
        'type': 'tooltip',
        'elementPathRule': '#input',
        'content': [
            '<div>test content</div>',
            '<p><span class="guide-header-text">Sample Header</span></p><p><span>Step 1</span></p>',
            '<button class="_pendo-guide-next_">Next</button>',
            '<script id="pendo-inline-script">',
            '<% if (typeof guide !== "undefined") { %>',
            'var guide = pendo.findGuideById("<%= guide.id %>");',
            'var step = guide && guide.findStepById("<%= step.id %>");',
            '<% } %>',
            '(function wireGuideAdvanceButton (step) {',
            'step && step.attachEvent(step.guideElement[0], "click", function (e) {',
            'var advanceButton = pendo.dom(e.target || e.srcElement).closest("._pendo-guide-next_");',
            'if (advanceButton.length) {',
            'pendo.onGuideAdvanced();',
            '}',
            '});',
            '})(step,guide);',
            '</script>'
        ].join('\n')
    }, {
        'id': 'step2',
        'guideId': 'guide1',
        'type': 'lightbox',
        'content': [
            '<div>test content</div>',
            '<p><span class="guide-header-text">Sample Header</span></p><p><span>Step 2</span></p>'
        ].join('\n')
    }
];

describe('Wire Advanced button Service Snippet', function () {
    beforeEach(function () {
        // Create an oject providing the steps defined above
        this.WIRE_ADVANCED = {
            'id': 'guide1',
            'name': 'Wire advanced button',
            'isMultiStep': true,
            'launchMethod': 'auto',
            'steps': wireAdvanced
        };

        // Watch the FrameController Object and return true when isInThisFrame is executed
        spyOn(FrameController, 'isInThisFrame').and.returnValue(true);
    });

    afterEach(function () {
        // Clean up after each execution
        stopGuides();
        clearLoopTimer();
    });

    describe('#wireAdvanced', function () {
        beforeEach(function () {
            activeGuides = [];
            pendo.lastGuideStepSeen = {};

            // Set local context with WIRE_ADVANCED object
            var WIRE_ADVANCED = this.WIRE_ADVANCED;

            // Watch our guide API functions
            spyOn(window, 'advancedGuide');
            spyOn(window, '_updateGuideStepStatus');

            // Provide the WIRE_ADVANCED object to the agent and let GuideFactory set Guide attributes
            // GuideFactory will return a guide object
            activeGuides = _.map([this.WIRE_ADVANCED], GuideFactory);
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

        it('Should display a guide and advance on Next button click', function () {
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);
            var nextButton = document.getElementsByClassName('_pendo-guide-next_');

            // Execute click event on our element
            nextButton[0].click();

            // Validate our guide advances and updates the step status
            expect(advancedGuide).toHaveBeenCalled();
            expect(_updateGuideStepStatus).toHaveBeenCalled();
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);

            onGuideDismissed();
        });
    });
});
