# Carousel (simple)

A minimal horizontal slider with previous and next arrow buttons. Each arrow scrolls the slide list by one slide width. Use it to show a few slides inside a single guide step.

## Files

- `carousel.html`: HTML tab of a Custom Code Block
- `carousel.css`: CSS tab
- `carousel.js`: JS tab

## Setup

1. Paste each file into the matching tab of a Custom Code Block.
2. Add your content inside each `li.slide` in `carousel.html`. Add or remove `li.slide` items to change the number of slides.
3. Change or remove the placeholder background colors set with `.slide:nth-child(1)` to `.slide:nth-child(4)` in `carousel.css`.
4. Adjust the slider height (`height: calc(30vh)` on `.slides-container`) if needed.

## Notes

- The JS looks up elements by the IDs `slides-container`, `slide-arrow-prev`, and `slide-arrow-next`, and the class `.slide`. Keep these names, or update them in both the HTML and the JS.
- The scroll distance is the width of the first `.slide` element.
- There is no wrap-around: clicking past the first or last slide does nothing.
- `.slides-container` uses `overflow: scroll` with `scroll-behavior: smooth`, so users can also scroll the slides directly.
- `carousel.css` includes a `*` rule (`box-sizing: border-box`) and a `body` rule (`max-width: 1440px; margin: auto`). Remove them if they affect your page.
