// handles the percentage fill and ticking counter for large bottom percetage bar for onboarding module
// assumes the following html structure (adjust classes as needed)

// <div class='_pendo-launcher-onboarding-progress_'>
//     <div class='_pendo-progress-area-inner_'>
//         <div class='_pendo-progress-bar-outer_'>
//             <div class='_pendo-progress-bar-inner_'>
//             </div>
//         </div>
//     </div>
//     <label class='_pendo-onboarding-progress_'>
//         <span class="percent-complete"></span>% Complete
//     </label>
// </div>


function updateOverallProgressUI() {
    var percentComplete = pendo.guideWidget.onboarding.percentComplete;
    dom('._pendo-progress-bar-inner_').css('width: ' + percentComplete + '%');
    dom('span.percent-complete').html(percentComplete);
    $('span.percent-complete').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            delay: 600,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}
