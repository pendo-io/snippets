(function advanceGuideOnHover(dom) {
    var advanceOnce = pendo._.once(pendo.onGuideAdvanced); // make sure the guide only advances one time
    
    // You can add as many element rules as you like in a list here
    var one = dom('#id-number-1'); // These element rules can be an id like #myId or a class like .myClass
    var two = dom('#id-number-2');
    var elms = [one, two]; // if you add more elements to the list, you must also add them to the array like [one, two, three] etc.

    elms.forEach(function(elm) {
        pendo.attachEvent(dom(elm)[0], 'mouseover', advanceOnce);
    });

    step.after('teardown', function () { // remove listeners after step completes
        elms.forEach(function(elm) {
            pendo.detachEvent(dom(elm)[0], 'mouseover', advanceOnce);
        });
    });

})(pendo.dom)
