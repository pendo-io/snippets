# Carousel (robust)

A full-screen, multi-step card carousel. Each guide step is one card with a text panel on the left and a media area on the right, plus previous and next arrows and clickable step indicator dots. Use it when you want slide-style navigation with animated transitions between steps.

## Files

- `carousel.html`: HTML tab of a Custom Code Block in each step
- `carousel.css`: CSS tab
- `carousel.js`: JS tab

## Setup

1. Build a guide with one step per card, and add the same three files to every step.
2. In `carousel.html`, fill in the content for that step:
   - `h2._pendo-guide-carousel-name_`: small label in the top left corner
   - `h3`: title text
   - `h4`: body text
   - `._pendo-guide-content-right-container_`: media for the right side (the CSS sizes a `video` here to 450px tall)
3. Optionally change the left panel color (`background: #ec2059` on `._pendo-guide-content-left-background_`), the fonts (`"proxima-nova"`), and the text shown in `._pendo-guide-screen-message_`.

## Notes

- The JS builds one `.step-indicator` dot per step (from `guide.getTotalSteps()`) inside `._pendo-guide-step-indicators_` and marks the current one `active`. Clicking a dot moves to that step.
- `._pendo-guide-next-arrow_` advances; on the last step it dismisses the guide instead. `._pendo-guide-previous-arrow_` goes back; on the first step it also dismisses the guide.
- Navigation adds a slide or fade class (300ms animations) and waits 350ms before changing steps.
- The CSS refers to the animation names `pendo-card-slide-left-in`, `pendo-card-slide-left-out`, `pendo-card-slide-right-in`, `pendo-card-slide-right-out`, `pendo-card-fade-in`, and `pendo-card-fade-out`; no `@keyframes` for them are included.
- While the guide is shown, the JS adds the class `modal-open` to `body`. No styles for `modal-open` are included; add your own (for example `overflow: hidden`) if you want to stop the page scrolling behind the carousel.
- The CSS targets `._pendo-guide-container_`, `._pendo-guide-content_`, and `._pendo-close-guide_`; the first block of declarations has no selector, and the comment in the file says it is meant to apply to the guide's outer element.
- The CSS uses nested selectors (for example `&.active`), so it depends on native CSS nesting support in the browser.
- On windows 600px wide or less, or 575px tall or less, the cards are hidden and `._pendo-guide-screen-message_` is shown instead.
- The click handler also checks for `._pendo-guide-back-to-main_` and `._pendo-guide-takeme-wrapper_`, but those elements are not in the HTML.
