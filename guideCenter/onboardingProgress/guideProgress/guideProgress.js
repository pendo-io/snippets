// handles the percentage fill of each individual onboarding guide
// assumes the following html structure (adjust classes as needed)

// <div class="_pendo-guide-listing_ _pendo-onboarding-guide-listing_">
//     <div class="_pendo-launcher-guide-listing_">
//         <% pendo._.each(guides, function(guide) { %>
//             <% if (guide.isOnboarding(guide)) { %>
//                 <div class="_pendo-launcher-item_ _pendo-onboarding-item_ _pendo-onboarding-item-status-<%= guideStatus(guide) %>_" id="launcher-<%= guide.id %>">
//                     <% if (guide.isMultiStep && guideStatus(guide) == 'in-progress') { %>
//                         <svg class="_pendo-launcher-onboarding-item-status-svg_" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid">
//                             <circle class="_pendo-launcher-onboarding-item-status-gauge_" cx="200" cy="200" r="100">
//                             </circle>
//                             <circle stroke-dasharray="629" stroke-dashoffset="629" class="_pendo-launcher-onboarding-item-status-arc_" cx="200" cy="200" r="100" transform="rotate(-90 200 200)" data-position="<%= guide.getPositionOfStep(guide.activeStep()) %>" data-total="<%= guide.getTotalSteps() %>">
//                             </circle>
//                         </svg>
//                         <% } %>
//                             <a href="javascript:void(0);">
//                                 <%= guide.name %>
//                             </a>
//                             <% if (guide.isMultiStep && guideStatus(guide) == 'in-progress') { %>
//                                 <div class="_pendo-onboarding-item-progress_"> Task in Progress (Step
//                                     <%= guide.getPositionOfStep(guide.activeStep()) %> of
//                                         <%= guide.getTotalSteps() %>) </div>
//                                 <% } %>
//                 </div>
//                 <% } %>
//                     <% }) %>
//     </div>
// </div>


function updateGuideProgressUI() {
    var list = document.getElementsByClassName("_pendo-launcher-onboarding-item-status-arc_");
    for (var item of list) {
        var step = item.getAttribute("data-position");
        var total = item.getAttribute("data-total");
        var decimal = step / total;
        var rotate = decimal * 100;
        var fromOffset = 629;
        var toOffset = (100 - rotate) * 6.29;
        item.setAttribute('stroke-dashoffset', toOffset);
    }
}