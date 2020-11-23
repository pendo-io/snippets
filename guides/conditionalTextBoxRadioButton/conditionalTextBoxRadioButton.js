// INSTRUCTIONS: Be sure to change the value for "textBoxQuestionText" below to the text directly above your
// open text poll.  All other functionality should operate normally.  Note that this functionality should
// always be contained within its own guide step, or it may affect other polls in the guide.

var textBoxQuestionText = "Tell us more about your choice";
var isTextBoxVisible = true;

if(!pendo.designerEnabled) {
    pendo.dom('._pendo-open-text-poll-wrapper')[0].parentElement.parentElement.parentElement.style.display = "none";
    pendo.dom('.bb-text:contains('+ textBoxQuestionText +')')[0].style.display = "none";
    isTextBoxVisible = false;
}

pendo.dom('.pendo-radio').on('click', '.pendo-radio', function(e) {
    if (e.target.parentElement.innerText=="Other" && !isTextBoxVisible) {
    	pendo.dom('._pendo-open-text-poll-wrapper')[0].parentElement.parentElement.parentElement.style.display = "block";
    	pendo.dom('.bb-text:contains('+ textBoxQuestionText +')')[0].style.display = "block"; 
        isTextBoxVisible = true;
    } else if (e.target.parentElement.innerText!="Other" && isTextBoxVisible) {
        pendo.dom('._pendo-open-text-poll-wrapper')[0].parentElement.parentElement.parentElement.style.display = "none";
        pendo.dom('.bb-text:contains('+ textBoxQuestionText +')')[0].style.display = "none";
        pendo.dom('._pendo-open-text-poll-input')[0].value="";
        isTextBoxVisible = false;
    }
});
