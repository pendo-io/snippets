function handleClick(event) {
  // Ignore clicks inside any Pendo guide
  if (event.target.closest('[id^="pendo-"], [class*="_pendo-"], .pendo-guide')) {
    return;
  }
  try {
    pendo.onGuideAdvanced();
  } catch (e) {}

  parent.document.removeEventListener('click', handleClick, true);
}

parent.document.addEventListener('click', handleClick, true);
