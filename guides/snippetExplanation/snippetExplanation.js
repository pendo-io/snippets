//Add this to the top of your code snippet.  Don't forget to declare pendo.dom at the end of your containing function.
var codeExplanation = dom("code-explanation");
if (!pendo.designerEnabled) {
	codeExplanation.addClass("pendo-hide");
};