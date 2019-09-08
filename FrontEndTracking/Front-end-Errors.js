
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  pendo.track('Error', {
    message: errorMsg,
    url: url,
    line: lineNumber,
    column: column,
    error: errorObj
  });
  console.log("error sent to pendo")
}
