'use strict';

var skipSteps = [
    {
        'id': 'step1',
        'guideId': 'guide1',
        'type': 'banner',
        'attributes': {
            'position': 'bottom'
        },
        'content': [
            '<div>test content</div>',
            '<p><span class="guide-header-text">Sample Header</span></p><p><span>Step 1</span></p>',
            '<button class="_pendo-guide-next_">Next</button><style id="pendo-inline-css"',
            'type="text/css">#_pendo_g_step1_ {',
            'display:block; }',
            '</style>',
            '<script id="pendo-inline-script">',
            '<% if (typeof guide !== "undefined") { %>',
            'var guide = pendo.findGuideById("<%= guide.id %>");',
            'var step = guide && guide.findStepById("<%= step.id %>");',
            '<% } %>',
            'var nextStep = guide.steps[guide.getPositionOfStep(step)];',
            '(function checkElementAndSkip() {',
            'var results = pendo.Sizzle(nextStep.elementPathRule);',
            'if (results.length === 0 || !pendo._.some(results, pendo.isElementVisible)) {',
            'pendo.log(guide.id + ":advance 2 steps");',
            'pendo.onGuideAdvanced(nextStep);',
            '} else {',
            'pendo.log(guide.id + ":advance 1 step");',
            'pendo.onGuideAdvanced();',
            '}',
            '})(step, guide)',
            '</script>'
        ].join('\n')
    }, {
        'guideId': 'guide1',
        'id': 'step2',
        'type': 'tooltip',
        'elementPathRule': '#foo'
    }, {
        'guideId': 'guide1',
        'id': 'step3',
        'type': 'tooltip',
        'elementPathRule': '#bar'
    }, {
        'guideId': 'guide1',
        'id': 'step4',
        'type': 'tooltip',
        'elementPathRule': '#baz'
    }
];

describe('Skip Step No Element Service Snippet', function () {
    beforeEach(function () {
        this.SKIP_STEP = {
            'id': 'guide1',
            'name': 'Skip Step',
            'isMultiStep': true,
            'launchMethod': 'auto',
            'steps': skipSteps
        };

        spyOn(FrameController, 'isInThisFrame').and.returnValue(true);
    });

    afterEach(function () {
        stopGuides();
        clearLoopTimer();
    });

    describe('#skipStep', function () {
        beforeEach(function () {
            activeGuides = [];
            pendo.lastGuideStepSeen = {};

            var SKIP_STEP = this.SKIP_STEP;

            spyOn(window, 'advancedGuide').and.callThrough();
            spyOn(window, 'dismissedGuide').and.callThrough();
            spyOn(window, '_updateGuideStepStatus');

            activeGuides = _.map([this.SKIP_STEP], GuideFactory);
            this.step = activeGuides[0].steps[0];
        });

        afterEach(function () {
            stopGuides();
            clearLoopTimer();
        });

        it('Should display a guide and skip to Step 2 (index 1)', function () {
            setFixtures(['<input id="input" class="test-success _pendo-required_">Hello Gubnor!</input>',
                '<button id="foo" class="test-success">Next</button>',
                '<button id="bar" class="test-success">Back</button>',
                '<button id="baz" class="test-success">Dismiss</button>'
            ].join('')
        );
            window.lastGuideStepSeen = this.step.id;
            startGuides();

            expect(isGuideShown()).toBe(true);
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);

            pendo.onGuideDismissed();
        });

        it('Should display a guide and skip to Step 3 (index 2)', function () {
            setFixtures(['<input id="input" class="test-success _pendo-required_">Hello Gubnor!</input>',
                '<button id="bar" class="test-success">Back</button>',
                '<button id="baz" class="test-success">Dismiss</button>'
            ].join('')
        );
            window.lastGuideStepSeen = this.step.id;
            startGuides();

            expect(isGuideShown()).toBe(true);
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(2);

            pendo.onGuideDismissed();
        });
    });
});
