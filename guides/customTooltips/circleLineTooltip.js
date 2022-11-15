if(!pendo.designerEnabled) {
    rotateCaret();
}

(function (step, guide) {    
    var target = pendo.dom("#pendo-base")[0];
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.previousSibling.classList.contains("pendo-tooltip-caret") && pendo.dom("[class*='_PS_pendo']").length == 0) { 
               rotateCaret(target);
            }
        })
    })
    var config = {
        attributeFilter: ['data-layout'],
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    };
    
   observer.observe(target, config);  
    
})(step, guide);

function rotateCaret() {
    var svgColor = encodeURIComponent(pendo.dom("#pendo-guide-container")[0].style.borderColor);
    var borderWidth = parseInt(pendo.dom("#pendo-guide-container")[0].style.borderWidth, 10);
    var svgCaretHeight = "";
    var svgContent = "url(\"data:image/svg+xml;utf8,%3Csvg width='14' height='10000' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cellipse stroke-width='0' ry='4' rx='4' id='svg_1' cy='154' cx='129' stroke='" + svgColor + "' fill='%23fff'/%3E%3Cellipse stroke-width='" + borderWidth + "' stroke='" + svgColor + "' ry='5.37504' rx='5.37504' id='svg_2' cy='6.87837' cx='6.88012' fill='%23fff'/%3E%3Cline id='svg_3' y2='10000' x2='6.78423' y1='13.49512' x1='6.78423' stroke-width='" + borderWidth + "' stroke='" + svgColor + "' fill='none'/%3E%3C/g%3E%3C/svg%3E\")";
    if (!pendo.dom("#pendoSvgStyles").length) {
        var styleElem = document.head.appendChild(document.createElement("style"));
        styleElem.id = "pendoSvgStyles";
    }

    //downcaret
    if(!pendo.dom(".pendo-tooltip-caret-border")[0].style.borderTopColor.length) {
        pendo.dom(".pendo-tooltip-caret-border")[0].classList.add("_PS_pendo-up-caret");
        pendo.dom("#pendo-guide-container")[0].classList.add("_PS_container-up-caret");
        svgCaretHeight = Math.abs(parseInt(pendo.dom(".pendo-tooltip-caret-border")[0].style.top, 10));
    }
    //upcaret
    if(!pendo.dom(".pendo-tooltip-caret-border")[0].style.borderBottomColor.length) {
        pendo.dom(".pendo-tooltip-caret-border")[0].classList.add("_PS_pendo-down-caret");
        pendo.dom("#pendo-guide-container")[0].classList.add("_PS_container-down-caret");
        svgCaretHeight = Math.abs(parseInt(pendo.dom(".pendo-tooltip-caret-border")[0].style.bottom, 10));
    } 
    //leftcaret
    if(!pendo.dom(".pendo-tooltip-caret-border")[0].style.borderLeftColor.length) {
        pendo.dom(".pendo-tooltip-caret-border")[0].classList.add("_PS_pendo-left-caret");
        pendo.dom("#pendo-guide-container")[0].classList.add("_PS_container-left-caret");
        // no idea why we need to add 8 here, but it seems to work ¯\_(ツ)_/¯
        svgCaretHeight = Math.abs(parseInt(pendo.dom(".pendo-tooltip-caret-border")[0].style.left, 10)+8);
    } 
    //rightcaret
    if(!pendo.dom(".pendo-tooltip-caret-border")[0].style.borderRightColor.length) {
        pendo.dom(".pendo-tooltip-caret-border")[0].classList.add("_PS_pendo-right-caret");
        pendo.dom("#pendo-guide-container")[0].classList.add("_PS_container-right-caret");
        // no idea why we need to substract 16 here, but it seems to work ¯\_(ツ)_/¯
        svgCaretHeight = Math.abs(parseInt(pendo.dom(".pendo-tooltip-caret-border")[0].style.right, 10)-16);
    } 

    pendo.dom("#pendoSvgStyles")[0].innerHTML = '.pendo-tooltip-caret-border::before {background:' + svgContent + ';} .pendo-tooltip-caret-border::before {height: ' + svgCaretHeight + 'px!important;}';

}