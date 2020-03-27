(function advanceGuideOnHover(dom) {
    var advanceOnce = pendo._.once(pendo.onGuideAdvanced); // make sure the guide only advances one time

    var one = dom('#id-number-1');
    var two = dom('#id-number-2');
    var elms = [one, two];

    elms.forEach(function(elm) {
        pendo.attachEvent(dom(elm)[0], 'mouseover', advanceOnce);
    });

    step.after('teardown', function () { // remove listeners after step completes
        elms.forEach(function(elm) {
            pendo.detachEvent(dom(elm)[0], 'mouseover', advanceOnce);
        });
    });

})(pendo.dom)