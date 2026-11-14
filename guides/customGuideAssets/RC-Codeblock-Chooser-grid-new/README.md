# Chooser grid (code block)

A list of four clickable tiles, each with an image, a title, and a short description. Clicking a tile dismisses the current guide and shows the guide mapped to that tile. Use it as a menu that lets users pick which walkthrough to start.

## Files

- `html.html`: HTML tab of a Custom Code Block
- `css.css`: CSS tab
- `js.js`: JS tab

## Setup

1. In `html.html`, replace `IMAGE_URL_1` to `IMAGE_URL_4` with your image URLs, and replace the placeholder text (`Topic one` to `Topic four`, the short descriptions, and the intro text in `.a_btn-subtext` and `.a_btn-subtext_a`).
2. In `js.js`, replace `GUIDE_ID_1` to `GUIDE_ID_4` in the `guidesByTile` object with the IDs of the guides each tile should open.
3. To add a tile, copy a `div.container` block, give it a new class (for example `cont_5`), and add a matching entry to `guidesByTile`.

## Notes

- Each tile is a `.container` element with one `cont_N` class. The click handler finds the nearest `.container`, matches its `cont_N` class against `guidesByTile`, and does nothing if no class or guide ID matches.
- It calls `pendo.onGuideDismissed()` and then `pendo.showGuideById(guideId)`, so the chosen guide opens on the current page.
- Tiles are 310px wide and 70px tall (`.container`).
