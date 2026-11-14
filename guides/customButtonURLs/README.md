This allows you to use dynamic URLs in Button URL actions.

Simply add the code from customButtonURLs.js to the JavaScript in a custom code block. No changes to the code are needed.

You can now use values from the metadata in your URLs by surrounding them in a ${} block.

Example URL: https://www.example.com/user=${visitor.id}

Values are URL-encoded when they are inserted, and a field that is missing from the metadata is replaced with an empty string.

## Privacy

Anything you put in a URL can end up in browser history, server and proxy logs, analytics tools, and the `Referer` header sent to other sites. Avoid personal data such as email addresses, names, or visitor IDs that are email addresses. Prefer an opaque identifier (for example an account ID), and only send data to sites you control.
