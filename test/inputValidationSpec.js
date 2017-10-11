'use strict';

// Create steps for the Guide
var inputValidation = [
    {
        'id': 'step1',
        'guideId': 'guide1',
        'type': 'tooltip',
        'elementPathRule': '#input',
        'content': [
            '<div>test content</div>',
            '<p><span class="guide-header-text">Sample Header</span></p><p><span>Step 1</span></p>',
            '<button class="_pendo-guide-next_">Next</button>',
            '<p><span class="_pendo-required_ _pendo-hidden_">Required</span></p>',
            '<style id="pendo-inline-css"',
            'type="text/css">._pendo-hidden_ {',
            'display:none; }',
            '._pendo-active_ {',
            'color: red; }',
            '</style>',
            '<script id="pendo-inline-script">',
            '<% if (typeof guide !== "undefined") { %>',
            'var guide = pendo.findGuideById("<%= guide.id %>");',
            'var step = guide && guide.findStepById("<%= step.id %>");',
            '<% } %>',
            '(function wireGuideAdvanceButton(step) {',
            'step && step.attachEvent(step.guideElement[0], "click", function(e) {',
            'var advanceButton = pendo.dom(e.target || e.srcElement).closest("._pendo-guide-next_");',
            'if (advanceButton.length) {;',
            'if (checkEmpty()) {',
            'addPendoRequired();',
            '} else {',
            'checkInputValue(pendo.Sizzle(step.elementPathRule)[0]);',
            'pendo.onGuideAdvanced();',
            '}',
            '}',
            '});',
            'step && step.attachEvent(pendo.Sizzle(step.elementPathRule)[0], "keydown", function(e) {',
            'checkTabPress(e);',
            '});',
            'step && step.attachEvent(pendo.Sizzle(step.elementPathRule)[0], "keyup", function(e) {',
            'checkInputValue(e);',
            '});',
            'function checkEmpty() {',
            'return pendo.Sizzle(step.elementPathRule)[0].value.length === 0;',
            '}',
            'function checkInputValue(e) {',
            'if (!checkEmpty()) {',
            'removePendoRequired();',
            '} else {',
            'addPendoRequired();',
            '}',
            '}',
            'function addPendoRequired() {',
            'var requiredElement = document.getElementsByClassName("_pendo-required_");',
            'requiredElement[0].classList.remove("_pendo-hidden_");',
            'requiredElement[0].classList.add("_pendo-active_");',
            '}',
            'function removePendoRequired() {',
            'var requiredElement = document.getElementsByClassName("_pendo-required_");',
            'requiredElement[0].classList.remove("_pendo-active_");',
            'requiredElement[0].classList.add("_pendo-hidden_");',
            '}',
            'var checkTabPress = function checkTabPress(e) {',
            'if (e.keyCode === 9) {',
            'if (checkEmpty()) {',
            'addPendoRequired();',
            '} else {',
            'pendo.onGuideAdvanced();',
            '}',
            '}',
            '}',
            '})(step, guide);',
            '</script>'
        ].join('\n')
    }, {
        'guideId': 'guide1',
        'id': '2',
        'type': 'tooltip',
        'elementPathRule': '#foo'
    }, {
        'guideId': 'guide1',
        'id': '3',
        'type': 'tooltip',
        'elementPathRule': '#bar'
    }
];

describe('Input Validation Service Snippet', function () {
    beforeEach(function () {
        // Create an object providing the steps defined above
        this.INPUT_VALIDATION_GUIDE = {
            'id': 'guide1',
            'name': 'Input Validation',
            'isMultiStep': true,
            'launchMethod': 'auto',
            'steps': inputValidation
        };

        // Watch the FrameController Object and return true when isInThisFrame is executed
        spyOn(FrameController, 'isInThisFrame').and.returnValue(true);
    });

    afterEach(function () {
        // Clean up after each execution
        stopGuides();
        clearLoopTimer();
    });

    describe('#inputValidation', function () {
        beforeEach(function () {
            activeGuides = [];
            pendo.lastGuideStepSeen = {};

            // Set local context with INPUT_VALIDATION_GUIDE object
            var INPUT_VALIDATION_GUIDE = this.INPUT_VALIDATION_GUIDE;

            // Watch our guide API functions
            spyOn(window, 'advancedGuide').and.callThrough();
            spyOn(window, 'dismissedGuide').and.callThrough();
            spyOn(window, '_updateGuideStepStatus');

            // Provide the INPUT_VALIDATION_GUIDE object to the agent and let GuideFactory set Guide attributes
            // GuideFactory will return a guide object
            activeGuides = _.map([this.INPUT_VALIDATION_GUIDE], GuideFactory);
            this.step = activeGuides[0].steps[0];

            // Add our elements to the DOM
            setFixtures(['<input type="text" id="input" class="test-success">Hello Gubnor!</input>',
                '<button id="foo" class="test-success">Next</button>',
                '<button id="bar" class="test-success">Back</button>',
                '<button id="baz" class="test-success">Dismiss</button>'
            ].join('')
        );
            // Create our tabEvent to be used in the tests
            window.tabEvent = new Event('keydown');
            tabEvent.keyCode = 9;
            tabEvent.which = tabEvent.keyCode;

            // Define our elements
            window.inputElement = document.getElementById('input');
            window.requiredElement = document.getElementsByClassName('_pendo-required_');
            window.nextButton = document.getElementsByClassName('_pendo-guide-next_');

            // Agent expects a lastGuideStepSeen. Set to our first step
            window.lastGuideStepSeen = activeGuides[0].steps[0].id;
            startGuides();
        });

        afterEach(function () {
             // Clean up after each execution
            stopGuides();
            clearLoopTimer();
        });

        it('Should send keydown event with tab, add required text and not advance the guide', function () {
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);

            // Execute the tabEvent
            inputElement.dispatchEvent(tabEvent);

            // Validate our Guide contains the appropriate classes and does not advance
            expect(requiredElement[0].classList).toContain('_pendo-active_');
            expect(requiredElement[0].classList).not.toContain('_pendo-hidden_');
            expect(advancedGuide).not.toHaveBeenCalled();
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(0);            
            onGuideDismissed();
        });

        it('Should click Next, add required text and not advance the guide', function () {
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);

            // Execute click event on out element
            nextButton[0].click();

            // Validate our Guide contains the appropriate classes and does not advance
            expect(requiredElement[0].classList).toContain('_pendo-active_');
            expect(requiredElement[0].classList).not.toContain('_pendo-hidden_');
            expect(advancedGuide).not.toHaveBeenCalled();
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(0);                        
            onGuideDismissed();
        });

        it('Should add text, send keydown with text and call onGuideAdvanced', function () {
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);

            // Add text to our input and execute tabEvent
            inputElement.value = String.fromCharCode(65);
            inputElement.dispatchEvent(tabEvent);

            // Validate our Guide advances
            expect(advancedGuide).toHaveBeenCalled();
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);                        
            onGuideDismissed();
        });

        it('Should add text, click next button and call onGuideAdvanced', function () {
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);

            // Add text to our input and execute click event on our element
            inputElement.value = String.fromCharCode(65);
            nextButton[0].click();

            // Validate our Guide advances
            expect(advancedGuide).toHaveBeenCalled();
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);                        
            onGuideDismissed();
        });

        it('Should send keydown for tab, add text, remove class and advance guide', function () {
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);

            // Execute tabEvent
            inputElement.dispatchEvent(tabEvent);

            // Validate our Guide contains the appropriate classes and does not advance
            expect(requiredElement[0].classList).toContain('_pendo-active_');
            expect(requiredElement[0].classList).not.toContain('_pendo-hidden_');
            expect(advancedGuide).not.toHaveBeenCalled();

            // Add text to our input and execute tabEvent
            inputElement.value = String.fromCharCode(65);
            inputElement.dispatchEvent(tabEvent);

            // Validate our guide advances
            expect(advancedGuide).toHaveBeenCalled();
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);                        
            onGuideDismissed();
        });

        it('Should send click, add text, remove class and advance guide', function () {
            // Check our Guide is displayed
            expect(isGuideShown()).toBe(true);
            
            // Execute click event on our element
            nextButton[0].click();

            // Validate our Guide contains the appropriate classes and does not advance
            expect(requiredElement[0].classList).toContain('_pendo-active_');
            expect(requiredElement[0].classList).not.toContain('_pendo-hidden_');
            expect(advancedGuide).not.toHaveBeenCalled();

            // Add text to our input and execute click event on our element
            inputElement.value = String.fromCharCode(65);
            nextButton[0].click();

            // Validate our guide advances
            expect(advancedGuide).toHaveBeenCalled();
            expect(pendo._.indexOf(guide.steps, pendo.guideDev.getActiveGuide().step)).toBe(1);                        
            onGuideDismissed();
        });
    });
});
