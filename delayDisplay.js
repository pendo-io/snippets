
/*
    The below function is intended to
    reveal a step that has been hidden
    using 'display: none;' at the top
    level of the CSS tab.
*/
(function delayDisplay(step){
    var guideElement = pendo._.find(pendo.dom('._pendo-guide-container_'), function(element) {
	    return element.parentNode.id === '_pendo_g_' + step.id;
    });

    window.setTimeout(function ()
    {
        guideElement.parentElement.style.display = 'block';
    }, 3000); //wait time in milliseconds; default is 3 seconds. This value can be templatized.
})(step);
