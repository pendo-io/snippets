(function perfObserver() {
  if (!window.PerformanceObserver) return;

  var metricQueue = [];
  var observer = new window.PerformanceObserver(function(list) {
    var entries = list.getEntries();
    var i, name, type, entry, eventName, metric, time, route;

    url = window.location.pathname;
    for (i = 0; i < entries.length; i++) {
      entry = entries[i];
      name = entry.name;
      type = entry.entryType;
      time = null;
      if (name === 'first-contentful-paint' || name === 'first-meaningful-paint') {
        time = entry.startTime;
        eventName = name;
      } else if (type === 'longtask' && entry.duration > 500) {
        time = entry.duration;
        eventName = type + '_over500';
      }
      if (time != null) {
        metricQueue.push({
          eventName: eventName,
          time: Math.round(time),
          type: '__pendo__performance',
          route: route
        });
      }
    }
    if (!window.pendo || !window.pendo.track || typeof window.pendo.track !== 'function') {
      if (metricQueue.length > 25) {
        metricQueue.length = 0;
      }
      return;
    }
    for (i = 0; i < metricQueue.length; i++) {
      metric = metricQueue[i];
      eventName = metric.eventName;
      delete metric.eventName;
      window.pendo.track(eventName, metric);
    }
    metricQueue.length = 0;
  });
  observer.observe({
    entryTypes: ['paint', 'mark', 'longtask']
  });
})();
