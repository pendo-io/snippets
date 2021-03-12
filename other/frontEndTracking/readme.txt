These two snippets can be placed around the same code as your pendo initialization snippet.

Pendo-Performance-Tracking uses the window.PerformanceObserver to monitor for events that take greater than 500ms to complete. This can be used to track performance within your front-end. It also monitors first-contentful-paint events. Both events are sent as track events.

Front-end-Errors is more of a proof of concept than anything else. It overrides the .onError function from the window and sends a track-event with any of the event data associated. More could be done here to track any errors that may come up before pendo has loaded.
