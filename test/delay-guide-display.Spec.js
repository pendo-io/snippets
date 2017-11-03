'use strict';

// Create steps for the Guide
var delayGuide = [
    {
        'id': 'step1',
        'guideId': 'guide1',
        'type': 'lightbox',
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
            'function pendoHideGuide() {',
            'pendo._.each(pendo.Sizzle("._pendo-guide_"), function(guide) {',
            'guide.style.visibility = "hidden";',
            '})',
            'pendo._.each(pendo.Sizzle("._pendo-backdrop_"), function(guide) {',
            'guide.style.display = "none";',
            '})',
            '}',
            'function pendoRevealGuide() {',
            'if (true) {',
            'pendo._.each(pendo.Sizzle("._pendo-guide_"), function(guide) {',
            'guide.style.visibility = "";',
            '})',
            'pendo._.each(pendo.Sizzle("._pendo-backdrop_"), function(guide) {',
            'guide.style.display = "block";',
            '})',
            '}',
            '}',
            'if (!pendo.designer) {',
            'pendoHideGuide();',
            '}',
            'else {',
            'pendoRevealGuide();',
            '}',
            'setTimeout(function () {',
            'if (true) {',
            'pendoRevealGuide();',
            '}',
            '}, 3000)',
            '</script>'
        ].join('\n')
    }
];

describe('Delay Guide Service Snippet', function () {
    beforeEach(function () {
        // Create an object providing the steps defined above
        this.DELAY_GUIDE = {
            'id': 'guide1',
            'name': 'Delay Guide',
            'isMultiStep': false,
            'launchMethod': 'auto',
            'steps': delayGuide
        };

        // Watch the FrameController Object and return true when isInThisFrame is executed
        spyOn(FrameController, 'isInThisFrame').and.returnValue(true);
    });

    afterEach(function () {
        // Clean up after each execution
        stopGuides();
        clearLoopTimer();
    });

    describe('#delayGuide', function () {
        beforeEach(function () {
            activeGuides = [];
            pendo.lastGuideStepSeen = {};

            // Set local context with DELAY_GUIDE object
            var DELAY_GUIDE = this.DELAY_GUIDE;

            // Watch our guide API functions
            spyOn(window, 'dismissedGuide');
            spyOn(window, '_updateGuideStepStatus');

            // Provide the DELAY_GUIDE object to the agent and let GuideFactory set Guide attributes
            // GuideFactory will return a guide object
            activeGuides = _.map([this.DELAY_GUIDE], GuideFactory);
            this.step = activeGuides[0].steps[0];

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

        // Pass done into the object for async execution
        // https://jasmine.github.io/api/2.8/global.html
        // Look under implementationCallback
        it('Should display a guide after 3 seconds', function (done) {
            setTimeout(function () {
                done();
            }, 3001);
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);

            onGuideDismissed();
        });
    });
});
