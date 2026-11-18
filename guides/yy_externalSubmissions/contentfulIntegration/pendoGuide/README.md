# Contentful dynamic guide

Fills a guide's title, description, details, and button text with an entry fetched from the Contentful CMS at display time. The entry to load comes from `window.ppContentGuideKey`, which your app or other Pendo content can set, so one guide can show different content.

## Files

- `ui.html`: HTML tab of a Custom Code Block
- `styles.css`: CSS tab
- `code.js`: JS tab

## Setup

1. In Contentful, create entries with the fields `title`, `description`, and `longDescription`.
2. In `code.js`, replace:
   - `CONTENTFUL_API_TOKEN` with a read-only Content Delivery API token
   - `CONTENTFUL_CONTENT_SPACE_ID` with your space ID
   - `YOUR_DEFAULT_CONTENT_KEY` with the entry ID to use when `window.ppContentGuideKey` is not set
3. Review the request URL built in `_getGuideContent`. It uses the Contentful environment `master`; change it if your content lives in another environment.
4. Set `window.ppContentGuideKey` to an entry ID before the guide shows to choose which entry is loaded.

## Notes

- The token is in the guide code, so anyone who can see the guide can read it. Use a read-only Content Delivery API token only.
- The fields map to elements in `ui.html`: `title` to `#title`, `description` to `#description`, `longDescription` to `#details`, and the button `#metricBtn` reads "View " followed by the title.
- `#metricBtn` has no click handler; add your own action.
- After loading, the code sets the `top` of `#pendo-guide-container` to minus half its height to re-center it. If that element is missing, the update fails.
- On success it sends a Pendo track event named `Dynamic Guide: <title>` with a `contentId` property.
- If the request fails or returns a status other than 200, the guide keeps its empty elements.
- `styles.css` loads the Source Sans Pro font from Google Fonts and applies it to all elements with a `*` rule.
