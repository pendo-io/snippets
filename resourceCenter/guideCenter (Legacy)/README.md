# Guide Center (Legacy) Snippets

These snippets are for the legacy Pendo Guide Center (Guide Center Classic). They will not work in the current Pendo Resource Center; snippets are not interchangeable between the two products.

Each snippet is pasted into the HTML, CSS, or JS column when editing the Guide Center. Placement notes below come from the comments in each file.

## contactForm

Adds a "Contact Us" panel to the Guide Center with email, subject, and message fields plus image attachments (drag and drop or browse). Submitting creates a Zendesk request through the Zendesk API; attachments are uploaded to Zendesk first.

### Files

- `contact.html`: HTML column. The comments at the top and bottom of the file indicate it belongs after the `<div class="_pendo-launcher-menu_">` content and before the `if (root.data.knowledgebase && root.data.knowledgebase.enabled)` block of the default template.
- `contact.less`: paste at the very end of the CSS column. Written in LESS (variables and nesting).
- `contact.js`: paste at the end of the JS column, immediately before the line `})(pendo.dom, pendo.guideWidget);`.

### Configure

1. In `contact.js`, set `zendeskApiAddress` (default `'https://yourcompany.zendesk.com/'`) to your Zendesk domain, including the trailing slash. The code posts to `api/v2/uploads.json` and `api/v2/requests.json` under that address with no authentication headers.
2. Optional: uncomment the "DYNAMIC EMAIL DETERMINATION" block in `contact.js` if your Pendo visitor ID is the visitor's email. It fills the `#email` field from `pendo.getVisitorId()` and hides it.
3. In `contact.less`, set `@uniform-color-scheme--primary` and `@uniform-color-scheme--secondary` to your colors.
4. In `contact.html`, edit the heading text ("Contact Us", "We would love to help") and the fallback link in the failure message (`<a href=""></a>`), which is empty by default.
5. The comment in `contact.less` notes you will likely need to adjust the CSS for the top of `_pendo-launcher-menu_` after adding the form.

### Notes

- The snippet uses `fetch` and the File API; check these against your product's browser support requirements.
- The requester's name and email are both set to the value of the email field.
- After a successful submit the form shows a confirmation, closes after 3 seconds, and resets. On failure, an error notice is shown for 5 seconds.
- The file contains several `@TODO` comments, including that file type and size are not checked before upload.

## onboardingProgress/guideProgress

Shows a per-guide progress ring and a "Task in Progress (Step X of Y)" label for in-progress multi-step onboarding guides, with status icons for not started, skipped, in progress, and complete.

### Files

- `guideProgress.html`: HTML column. A template that loops over `guides` and renders onboarding guides; it uses the template helpers `guideStatus` and `guide.isOnboarding`.
- `guideProgress.css`: CSS column.
- `guideProgress.js`: JS column. Defines `updateGuideProgressUI()`.

### Setup

1. Add the HTML and CSS to the matching columns, adjusting class names as needed.
2. Add `updateGuideProgressUI()` to the JS column and call it where you want the rings to update. The function is defined but not called by the snippet.

### Notes

- The ring fill is computed from each arc's `data-position` and `data-total` attributes; `629` is the full circumference used for `stroke-dashoffset`.
- Colors (`#00c583`, `#6a6c75`, `#dadce5`) are hardcoded in `guideProgress.css`.

## onboardingProgress/overallProgress

Adds a footer progress bar and an animated "% Complete" counter for overall onboarding progress.

### Files

- `updateOverallProgress.html`: HTML column.
- `updateOverallProgress.css`: CSS column.
- `updateOverallProgress.js`: JS column. Defines `updateOverallProgressUI()`.

### Setup

1. Add the HTML and CSS to the matching columns, adjusting class names as needed.
2. Add `updateOverallProgressUI()` to the JS column and call it where you want the bar to update. The function is defined but not called by the snippet.

### Notes

- Progress comes from `pendo.guideWidget.onboarding.percentComplete`.
- The function uses `dom` (available inside the Guide Center JS wrapper) and jQuery (`$`) for the counter animation, so jQuery must be loaded on the page.
- The bar and counter animate over 2 seconds after a 600 ms delay.

## simpleAccordionButton

Adds an extra accordion section to the Guide Center that lists a guide.

### Files

- `newAccordionTab.html`: HTML column. Paste the whole `div`; the file suggests placing it after the last complete element, before the last two `</div>` tags.
- `newAccordionTab.css`: bottom of the CSS column. Uses nested LESS syntax.

### Setup

1. Replace `##GUIDE-ID-HERE##` in `id="launcher-##GUIDE-ID-HERE##"` with the ID of the guide to launch.
2. Replace the button label "General Help 2" and the link text "Example Guide Name Here".
3. To list more guides, repeat the `_pendo-launcher-item_` block with each guide's ID.

## simpleSlideButton

Adds an extra menu button that slides to a new section listing a guide.

### Files

- `simpleSlideButton.html`: HTML column, in two parts. Place the "Extra Button Launch" block as the last `div` inside `<div class="_pendo-launcher-menu_">`, and the "Extra Button Content" block as the last `div` inside `<div class="_pendo-launcher-body_">`.
- `simpleSlideButton.css`: bottom of the CSS column. Uses nested LESS syntax.

### Setup

1. Replace `##GUIDE-ID-HERE##` in `id="launcher-##GUIDE-ID-HERE##"` with the ID of the guide to launch.
2. Replace the menu title "Extra Button" and the link text "Example Guide Name Here". The section title (`_pendo-launcher-section-title_`) is empty by default.
3. If you add more than one extra button, give each a unique `data-id` (default `extra-button`) and use the same value on the menu item, the content section, and the CSS selector.
