(function() {
    const textArea = pendo.dom("._pendo-open-text-poll-input")[0];
    const counterSpan = pendo.dom("#input_counter_span")[0];
    const maxInput = 30;

    if (textArea && counterSpan) {
        updateCharacterCount();
        textArea.setAttribute("maxlength", maxInput);
        textArea.addEventListener("input", updateCharacterCount);

        function updateCharacterCount() {
            counterSpan.innerText = `Characters remaining: ${maxInput-textArea.value.length}/${maxInput}`;
        }
    }
})();
