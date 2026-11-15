# Chooser grid with dynamic links

A grid of clickable image tiles built with an HTML table. Clicking a tile dismisses the current guide and shows another guide by ID. The JS also includes an optional, commented-out path that sends the user to a URL built from the visitor's account name metadata.

## Files

- `html.html`: HTML tab of a Custom Code Block
- `css.css`: CSS tab
- `js.js`: JS tab

## Setup

1. Upload each tile image with an image block in a Pendo guide, copy its URL, and replace `image link here` in `html.html`. Replace `image text here` with the tile label.
2. The active markup is a single tile (`td.guide-image.opt1`). The commented-out examples show a 3-tile row (`opt1` to `opt3`) and a 2-row grid (`opt1` to `opt6`). Each tile needs the `guide-image` class and a unique `optN` class.
3. In `js.js`, put guide IDs in the `guides` object (replace `'guide1'`, `'guide2'`, and `'guide3'`), and list the matching tile classes in the `imageClasses` object (`'opt1'`, `'opt2'`, and `'opt3'`). The two objects are paired by number, not by key: the tile under `img_N` opens the guide under `guide_N`. To add a tile, add both `img_4: 'opt4'` and `guide_4: '<guide id>'`; a tile without a matching `guide_N` entry does nothing.
4. To send users to a URL instead of showing a guide, comment out `pendo.showGuideById(guideId);`, make sure the `account_name` line near the top of the click handler is active, uncomment the `newurl` and `window.open(newurl, "_self");` lines below it, and replace the example domain (`.app.com`) and path with your own. That path needs account metadata with a `name` field.

## Notes

- On click, the code finds the nearest `.guide-image` element, finds which `imageClasses` entry (for example `img_2`) matches one of its classes, and opens the guide stored under the same number in `guides` (`guide_2`).
- It calls `pendo.onGuideDismissed()` before showing the next guide.
- Tile text is white (`color: white` on `td`); change it if your guide background is light.
- Hovering a tile shows an inset shadow.
