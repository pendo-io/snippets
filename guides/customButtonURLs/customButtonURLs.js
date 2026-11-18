((step) => {
    if(!pendo.designerEnabled) {
        // Replace the variables in the URL
        function replaceVariables(originalText, replacementData) {
            let newText = originalText;
            const variables = originalText.match(/\$\{.*?\}/g)?.filter((v,i,a)=>a.indexOf(v)==i) || [];
            variables.forEach(variable => {
                const [key, value] = variable.replace(/\$\{|\}/g, "").split(".");
                if (replacementData[key]) {
                    // Use an empty string for missing fields (never the whole metadata object), and
                    // encode the value so characters such as & ? # / + can't change the URL's meaning
                    const field = value ? replacementData[key][value] : undefined;
                    const replacement = (field === undefined || field === null || typeof field === "object") ? "" : encodeURIComponent(String(field));
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
                        // Not logged: the resulting URL can contain visitor or account data
                        param.value = replaceVariables(param.value, replacementData);
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