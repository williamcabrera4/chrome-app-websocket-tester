chrome.app.runtime.onLaunched.addListener(function () {
  chrome.app.window.create('./index.html', {
    'outerBounds': {
      'minWidth': 900,
      'minHeight': 670
    }
  });
});