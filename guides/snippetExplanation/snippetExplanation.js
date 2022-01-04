//Add this to the top of your code snippet.
var codeExplanation = pendo.dom(".code-explanation");
//Uncomment the following line if your code block is added to a step that you want the end user to see
//var stepContainerSize = pendo.dom("._pendo-step-container-size")[0];
	if (!pendo.designerEnabled) {
		codeExplanation.addClass("pendo-hide");
	//Uncomment the following line if your code block is added to a step that you want the end user to see
        //stepContainerSize.style.removeProperty("height");
	};
