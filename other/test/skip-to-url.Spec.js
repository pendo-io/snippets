'use strict';

// Create steps for the Guide
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

describe('Skip to Step on Page Service Snippet', function () {
    beforeEach(function () {
        // Create an object providing the steps defined above
        this.SKIP_PAGE_GUIDE = {
            'id': 'guide1',
            'name': 'Skip to Step on Page',
            'isMultiStep': true,
            'launchMethod': 'auto',
            'steps': skipToURL
        };

        // Watch the FrameController Object and return true when isInThisFrame is executed
        spyOn(FrameController, 'isInThisFrame').and.returnValue(true);
    });

    afterEach(function () {
        // Clean up after each execution
        stopGuides();
        clearLoopTimer();
    });

    describe('#skipToStepOnPage', function () {
        beforeEach(function () {
            activeGuides = [];
            pendo.lastGuideStepSeen = {};

            // Set local context with SKIP_PAGE_GUIDE object
            var SKIP_PAGE_GUIDE = this.SKIP_PAGE_GUIDE;

            // Watch our guide API functions
            spyOn(window, 'advancedGuide').and.callThrough();
            spyOn(window, 'dismissedGuide').and.callThrough();
            spyOn(window, '_updateGuideStepStatus');

            // Provide the SKIP_PAGE_GUIDE object to the agent and let GuideFactory set Guide attributes
            // GuideFactory will return a guide object
            activeGuides = _.map([this.SKIP_PAGE_GUIDE], GuideFactory);
            this.step = activeGuides[0].steps[0];

            // Add our elements to the DOM
            setFixtures(['<input type="text" id="input" class="test-success">Hello Gubnor!</input>',
                '<button id="foo" class="test-success">Next</button>',
                '<button id="bar" class="test-success">Back</button>',
                '<button id="baz" class="test-success">Dismiss</button>'
            ].join('')
        );

            // Agent expects a lastGuideStepSeen. Set to our first step
            window.lastGuideStepSeen = activeGuides[0].steps[0].id;
        });

        afterEach(function () {
             // Clean up after each execution
            stopGuides();
            clearLoopTimer();
        });

        it('Should present second step (index 1)', function () {
            startGuides();

            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);

            pendo.onGuideDismissed();
        });

        it('Should present third step (index 2)', function () {
            // Watch the pendo object and return new URL when getCurrentUrl is executed
            spyOn(pendo, 'getCurrentUrl').and.returnValue('https://localhost:9876/media_gallery.html');
            console.log(pendo.getCurrentUrl());

            startGuides();
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(2);

            pendo.onGuideDismissed();
        });

        it('Should present fourth step (index 3)', function () {
            // Watch the pendo object and return new URL when getCurrentUrl is executed
            spyOn(pendo, 'getCurrentUrl').and.returnValue('https://localhost:9876/typography.html');
            console.log(pendo.getCurrentUrl());

            startGuides();
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(3);

            pendo.onGuideDismissed();
        });

        it('Should present present first step when url does not match any', function () {
            // Watch the pendo object and return new URL when getCurrentUrl is executed
            spyOn(pendo, 'getCurrentUrl').and.returnValue('https://localhost:9876/index.html');
            console.log(pendo.getCurrentUrl());

            startGuides();
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);

            pendo.onGuideDismissed();
        });
    });
});
