'use strict';

var skipToURL = [
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
            '<button class="_pendo-guide-next_">Next</button>',
            '<style id="pendo-inline-css"',
            'type="text/css">#_pendo_g_step1 {',
            'display:none; }',
            '</style>',
            '<script id="pendo-inline-script">',
            '<% if (typeof guide !== "undefined") { %>',
            'var guide = pendo.findGuideById("<%= guide.id %>");',
            'var step = guide && guide.findStepById("<%= step.id %>");',
            '<% } %>',
            '(function skipToStepOnPage () {',
            'var url = pendo.getCurrentUrl();',
            'var currentGuide = guide;',
            'if (!currentGuide) {return;}',
            'var steps = currentGuide.steps;',
            'var testSteps = pendo._.filter(pendo._.rest(steps), function(step){',
            'return step.pageId;',
            '});',
            'var startingPoint = pendo._.indexOf(steps, pendo._.find(testSteps, function(step){',
            'return pendo.testUrlForStep(step.regexUrlRule, url);',
            '}));',
            'pendo.log(guide.id + ":startingPoint is "+startingPoint);',
            'if (startingPoint == -1) {',
            'pendo.onGuideAdvanced(step);',
            'return;',
            '}',
            'var prevStep = steps[startingPoint-1];',
            'pendo.log(guide.id + ":found starting step to be " +prevStep.id);',
            'pendo.onGuideAdvanced(prevStep);',
            '})(step, guide);',
            '</script>'
        ].join('\n')
    }, {
        'guideId': 'guide1',
        'id': 'step2',
        'type': 'lightbox',
        'content': [
            '<div>test content</div>',
            '<p><span class="guide-header-text">Sample Header</span></p><p><span>Step 1</span></p>',
            '<button class="_pendo-guide-next_">Next</button>'
        ].join('\n')
    }, {
        'guideId': 'guide1',
        'id': 'step3',
        'type': 'tooltip',
        'elementPathRule': '#bar',
        'pageId': '123',
        'regexUrlRule': '^https?://[^/]*/media_gallery\\.html/?(?:;[^#]*)?(?:\\?[^#]*)?(?:#.*)?$'
    },
    {
        'guideId': 'guide1',
        'id': 'step4',
        'type': 'tooltip',
        'elementPathRule': '#baz',
        'pageId': '543',
        'regexUrlRule': '^https?://[^/]*/typography\\.html/?(?:;[^#]*)?(?:\\?[^#]*)?(?:#.*)?$'
    }
];

fdescribe('Skip to Step on Page Service Snippet', function () {
    beforeEach(function () {
        this.SKIP_PAGE_GUIDE = {
            'id': 'guide1',
            'name': 'Skip to Step on Page',
            'isMultiStep': true,
            'launchMethod': 'auto',
            'steps': skipToURL
        };

        spyOn(FrameController, 'isInThisFrame').and.returnValue(true);
    });

    afterEach(function () {
        stopGuides();
        clearLoopTimer();
    });

    describe('#skipToStepOnPage', function () {
        beforeEach(function () {
            activeGuides = [];
            pendo.lastGuideStepSeen = {};

            var SKIP_PAGE_GUIDE = this.SKIP_PAGE_GUIDE;

            spyOn(window, 'advancedGuide').and.callThrough();
            spyOn(window, 'dismissedGuide').and.callThrough();
            spyOn(window, '_updateGuideStepStatus');

            activeGuides = _.map([this.SKIP_PAGE_GUIDE], GuideFactory);
            this.step = activeGuides[0].steps[0];

            setFixtures(['<input type="text" id="input" class="test-success">Hello Gubnor!</input>',
                '<button id="foo" class="test-success">Next</button>',
                '<button id="bar" class="test-success">Back</button>',
                '<button id="baz" class="test-success">Dismiss</button>'
            ].join('')
        );

            window.lastGuideStepSeen = activeGuides[0].steps[0].id;
        });

        afterEach(function () {
            stopGuides();
            clearLoopTimer();
        });

        it('Should present second step (index 1)', function () {
            startGuides();

            expect(isGuideShown()).toBe(true);
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);

            pendo.onGuideDismissed();
        });

        it('Should present third step (index 2)', function () {
            spyOn(pendo, 'getCurrentUrl').and.returnValue('https://localhost:9876/media_gallery.html');
            console.log(pendo.getCurrentUrl());

            startGuides();
            expect(isGuideShown()).toBe(true);
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(2);

            pendo.onGuideDismissed();
        });

        it('Should present fourth step (index 3)', function () {
            spyOn(pendo, 'getCurrentUrl').and.returnValue('https://localhost:9876/typography.html');
            console.log(pendo.getCurrentUrl());

            startGuides();
            expect(isGuideShown()).toBe(true);
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(3);

            pendo.onGuideDismissed();
        });

        it('Should present present first step when url does not match any', function () {
            spyOn(pendo, 'getCurrentUrl').and.returnValue('https://localhost:9876/index.html');
            console.log(pendo.getCurrentUrl());

            startGuides();
            expect(isGuideShown()).toBe(true);
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);

            pendo.onGuideDismissed();
        });
    });
});
