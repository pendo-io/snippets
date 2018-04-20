(function wireGuideAdvanceButton (step) {
    step && step.attachEvent(step.guideElement[0], 'click', function (e) {
        console.log('checking guide click');
        var elem = pendo.dom(e.target || e.srcElement).closest('.poll-choice');
        console.log(elem);
        var hiddenTextarea = pendo.Sizzle('#hidden-textarea')[0];
        console.log(hiddenTextarea);
        if (!elem.length) return;
        if (elem[0].checked) {
            console.log('adding element');
            hiddenTextarea.value = hiddenTextarea.value + elem[0].value + ',';
        } else {
            console.log('removing element');
            var idx = hiddenTextarea.value.indexOf(elem[0].value);
            if (idx === -1) return;
            hiddenTextarea.value = hiddenTextarea.value.substring(0, idx) + hiddenTextarea.value.substring( idx+elem[0].value.length + 1 );
        }

    });
})(step,guide);
