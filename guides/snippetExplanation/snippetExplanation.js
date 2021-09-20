//Add this to the top of your code snippet.  Don't forget to declare pendo.dom at the end of your containing function.
var codeExplanation = dom(".code-explanation");
//Uncomment the following line if your code block is added to a step that you want the end user to see
//var stepContainerSize = dom("._pendo-step-container-size")[0];
	if (!pendo.designerEnabled) {
		codeExplanation.addClass("pendo-hide");
		//Uncomment the following line if your code block is added to a step that you want the end user to see
        //stepContainerSize.style.removeProperty("height");
	};