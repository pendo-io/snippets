'use strict';

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
        this.DELAY_GUIDE = {
            'id': 'guide1',
            'name': 'Delay Guide',
            'isMultiStep': false,
            'launchMethod': 'auto',
            'steps': delayGuide
        };

        spyOn(FrameController, 'isInThisFrame').and.returnValue(true);
    });

    afterEach(function () {
        stopGuides();
        clearLoopTimer();
    });

    describe('#delayGuide', function () {
        beforeEach(function () {
            activeGuides = [];
            pendo.lastGuideStepSeen = {};

            var DELAY_GUIDE = this.DELAY_GUIDE;

            spyOn(window, 'dismissedGuide');
            spyOn(window, '_updateGuideStepStatus');

            activeGuides = _.map([this.DELAY_GUIDE], GuideFactory);
            this.step = activeGuides[0].steps[0];

            setFixtures('<input id="input" class="test-success _pendo-required_">Hello Gubnor!</input>');

            window.lastGuideStepSeen = this.step.id;
            startGuides();
        });

        afterEach(function () {
            stopGuides();
            clearLoopTimer();
        });

        it('Should display a guide after 3 seconds', function (done) {
            setTimeout(function () {
                done();
            }, 3001);
            expect(isGuideShown()).toBe(true);

            onGuideDismissed();
        });
    });
});
