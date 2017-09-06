/* Add JavaScript Here */

(function addAnimationClass(step) {
    var guideElement = pendo._.find(pendo.dom('._pendo-guide-container_'), function(element) {
	    return element.parentNode.id === '_pendo_g_' + step.id;
    });
    switch(pendo._.without(guideElement.classList, '_pendo-guide-container_')[0]) {
        case 'top' :
            step.elements[0].classList.add('top');
            return;
        case 'right' :
            step.elements[0].classList.add('right');
            return;
        case 'bottom' :
            step.elements[0].classList.add('bottom');
            return;
        case 'left' :
            step.elements[0].classList.add('left');
            return;
        default :
            return;
    }
})(step);
