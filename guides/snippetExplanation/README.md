# Snippet Explanation

A template for documenting a custom code block inside the guide itself. The explanation is visible in the Visual Design Studio but hidden from visitors, so anyone editing the guide later can see what the code does.

## Files

- `snippetExplanation.html`: HTML tab of the Custom Code Block you want to document.
- `snippetExplanation.css`: CSS tab of the same Custom Code Block.
- `snippetExplanation.js`: add to the top of the JS tab of the same Custom Code Block.

## Setup

1. Paste each file into its matching tab, keeping your existing code below the explanation JS.
2. In `snippetExplanation.html`, replace the `<!--Insert brief explanation here-->` comment with a short description, and replace the "If user does X" and "If user doesn't X" list items with the expected behavior.
3. If the code block is on a step that visitors do see, uncomment the `.code-explanation` rule in the CSS and the two `stepContainerSize` lines in the JS. Also edit or remove the "This step is only visible in the designer" line in the HTML.

## Notes

- When `pendo.designerEnabled` is false (preview or live), the JS adds the class `pendo-hide` to `.code-explanation`, and the CSS hides it with `display: none !important`.
- The optional `stepContainerSize` lines remove the fixed height from `._pendo-step-container-size` so the step can shrink once the explanation is hidden.
- The optional `.code-explanation` CSS gives the explanation a `WhiteSmoke` background so it stands out from the visitor-facing content in the designer.
