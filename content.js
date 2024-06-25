chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "changeBackgroundColor") {
        document.body.style.backgroundColor = request.color;
    } else if (request.action === "applyFontSize") {
        document.body.style.fontSize = request.fontSize;
    }
    if (request.action === "toggleDarkTheme") {
      document.body.classList.toggle('dark-theme');
  }
});

// Example of applying the font size setting
chrome.storage.sync.get('fontSize', (data) => {
    const fontSize = data.fontSize || 'medium';
    document.body.style.fontSize = fontSize === 'small' ? '12px' : fontSize === 'medium' ? '16px' : '20px';
});