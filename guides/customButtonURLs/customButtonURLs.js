((step) => {
    if(!pendo.designerEnabled) {
        // Replace the variables in the URL
        function replaceVariables(originalText, replacementData) {
            let newText = originalText;
            const variables = originalText.match(/\$\{.*?\}/g)?.filter((v,i,a)=>a.indexOf(v)==i) || [];
            variables.forEach(variable => {
                const [key, value] = variable.replace(/\$\{|\}/g, "").split(".");
                if (replacementData[key]) {
                    const replacement = replacementData[key][value] || replacementData[key];
                    newText = newText.replaceAll(variable, replacement);
                }
            });
            return newText;
        }

        // Recursively find and update the URLs in the domJson
        function findAndUpdateUrls(originalData, replacementData) {
            originalData.actions?.forEach(action => {
                action.parameters?.forEach(param => {
                    if (param.name === "url") {
                        pendo.log("Found:", param.value);
                        param.value = replaceVariables(param.value, replacementData);
                        pendo.log("Replaced:", param.value);
                    }
                });
            });

            // Recursively update the URLs in the children
            originalData.children?.forEach(child => {
                findAndUpdateUrls(child, replacementData);
            });
        }

        // Update the urls in the domJson
        if (step.domJson) {
            findAndUpdateUrls(step.domJson, pendo.getSerializedMetadata());
        }
    }
})(step);