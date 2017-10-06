'use strict';

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
        this.WIRE_ADVANCED = {
            'id': 'guide1',
            'name': 'Wire advanced button',
            'isMultiStep': true,
            'launchMethod': 'auto',
            'steps': wireAdvanced
        };

        spyOn(FrameController, 'isInThisFrame').and.returnValue(true);
    });

    afterEach(function () {
        stopGuides();
        clearLoopTimer();
    });

    describe('#wireAdvanced', function () {
        beforeEach(function () {
            activeGuides = [];
            pendo.lastGuideStepSeen = {};

            var WIRE_ADVANCED = this.WIRE_ADVANCED;

            spyOn(window, 'advancedGuide');
            spyOn(window, '_updateGuideStepStatus');

            activeGuides = _.map([this.WIRE_ADVANCED], GuideFactory);
            this.step = activeGuides[0].steps[0];

            setFixtures('<input id="input" class="test-success _pendo-required_">Hello Gubnor!</input>');

            window.lastGuideStepSeen = this.step.id;
            startGuides();
        });

        afterEach(function () {
            stopGuides();
            clearLoopTimer();
        });

        it('Should display a guide and advance on Next button click', function () {
            expect(isGuideShown()).toBe(true);
            var nextButton = document.getElementsByClassName('_pendo-guide-next_');

            nextButton[0].click();

            expect(advancedGuide).toHaveBeenCalled();
            expect(_updateGuideStepStatus).toHaveBeenCalled();
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);

            onGuideDismissed();
        });
    });
});
