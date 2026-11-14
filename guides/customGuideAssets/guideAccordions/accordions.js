function initAcc(elem, option){
    // Listen on the guide container rather than the whole document, so the listener
    // goes away with the guide and accordions in the host app are not affected
    // This guide's own element. step.guideElement works for overlay and embedded guides; the fallback
    // matches any container ID that starts with pendo-guide-container (embedded guides add a suffix).
    var guideContainer = (typeof step !== 'undefined' && step && step.guideElement && step.guideElement[0]) || document.querySelector('[id^="pendo-guide-container"]');
    if (!guideContainer || guideContainer.getAttribute('data-accordion-ready')) return;
    guideContainer.setAttribute('data-accordion-ready', 'true');

    //addEventListener on mouse click
    guideContainer.addEventListener('click', function (e) {
        //check is the right element clicked
        if (!e.target.matches(elem+' .a-btn')) return;
        else{
            //check if element contains active class
            if(!e.target.parentElement.classList.contains('active')){
                if(option==true){
                    //if option true remove active class from all other accordions 
                    var elementList = guideContainer.querySelectorAll(elem +' .a-container');
                    Array.prototype.forEach.call(elementList, function (e) {
                        e.classList.remove('active');
                    });
                }    
                //add active class on cliked accordion     
                e.target.parentElement.classList.add('active');
            }else{
                //remove active class on cliked accordion     
                e.target.parentElement.classList.remove('active');
            }
        }
    });
}
     
//activate accordion function
initAcc('.accordion', true);
