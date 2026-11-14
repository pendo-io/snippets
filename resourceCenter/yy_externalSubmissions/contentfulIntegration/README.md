# Contentful Glossary for the Resource Center

Builds a searchable list inside the Pendo Resource Center from entries stored in the Contentful CMS. Clicking an entry stores the entry's Contentful ID and opens a Pendo guide that you build to display that content.

## Files

- `ui.html`: HTML of a Code Sandbox module in the Resource Center (search box and empty `#glossaryTable`).
- `style.css`: CSS of the same Code Sandbox module.
- `code.js`: JS of the same Code Sandbox module.

## Setup

1. In `code.js`, replace these placeholders:
   - `CONTENTUFL_AUTH_TOKEN` (value of `contentfulToken`): your Contentful access token.
   - `CONTENTFUL_SPACE_ID` (value of `contentfulSpaceId`): your Contentful space ID.
   - `YOUR_CONTENT_TYPE` (in the `query` URL): the ID of the Contentful content type to list.
   - `PENDO_GUIDE ID` (in `pendo.showGuideById`): the ID of the Pendo guide to open when an entry is clicked.
2. Make sure the content type has a `title` field. Entries are sorted by `fields.title` and the title is the text shown in each row.
3. If your content is not in the `master` environment, change `environments/master` in the `query` URL.
4. Build the guide referenced in step 1 so it reads `window.ppContentGuideKey` (the clicked entry's `sys.id`) and loads that entry. That guide is not part of this snippet.

## Notes

- The token is placed in the request URL in code that runs in the browser, so anyone who can view the page can see it. Use a read-only Content Delivery API token, never a management token.
- The code requests `https://cdn.contentful.com` once when the module loads. It makes a single request and does not page through results.
- Errors are not handled; if the request fails, the list stays empty.
- Typing in `#searchBox` filters rows by title, case-insensitively.
