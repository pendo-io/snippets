(function advanceGuideOnHover(dom) {
    var advanceOnce = pendo._.once(pendo.onGuideAdvanced); // make sure the guide only advances one time
    
    // You can add as many element rules as you like in a list here
    var one = dom('#myId'); // These element rules can be an id like #myId or a class like .myClass
    var two = dom('.myClass');
    var elms = [one, two]; // if you add more elements to the list, you must also add them to the array like [one, two, three, four ...]

    elms.forEach(function(elm) {
        pendo.attachEvent(dom(elm)[0], 'click', advanceOnce);
    });

    step.after('teardown', function () { // remove listeners after step completes
        elms.forEach(function(elm) {
            pendo.detachEvent(dom(elm)[0], 'click', advanceOnce);
        });
    });

})(pendo.dom)
