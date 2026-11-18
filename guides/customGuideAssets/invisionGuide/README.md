# InVision prototype guide

Embeds an InVision prototype in a guide using an iframe, with a "Done exploring!" button below it that advances the guide. Use it to let users click through a prototype without leaving your app.

## Files

- `invision.html`: HTML tab of a Custom Code Block
- `invision.css`: CSS tab
- `invision.js`: JS tab

## Setup

1. Replace `{{ invision app link goes here }}` in the iframe `src` in `invision.html` with your InVision share link.
2. Optionally change the button label (`Done exploring! 👍`) and its colors (`#ec2059`, and `#ff3a6c` on hover) in `._pendo-guide-next_`.

## Notes

- Clicking `._pendo-guide-next_` calls `pendo.onGuideAdvanced()`.
- `._pendo-guide-invision-embed_` keeps a 16:10 frame (`padding: 0 0 62.5%`) and stretches the iframe to fill it.
- The first block of declarations in `invision.css` has no selector (full width and height, `max-width: 1300px`). The rest targets `._pendo-guide-container_`, `._pendo-guide-content_`, and `._pendo-close-guide_`.
- The iframe rule uses a nested selector (`> iframe`), so it depends on native CSS nesting support in the browser.
- The prototype must allow being embedded in an iframe on your site.
