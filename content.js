chrome.storage.sync.get('fontSize', (data) => {
    const fontSize = data.fontSize || 'medium';
    document.body.style.fontSize = fontSize === 'small' ? '12px' : fontSize === 'medium' ? '16px' : '20px';
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case "changeBackgroundColor":
            document.body.style.backgroundColor = request.color;
            break;
        case "applyFontSize":
            document.body.style.fontSize = request.fontSize;
            break;
        case "toggleDarkTheme":
            document.body.classList.toggle('dark-theme');
            break;
        default:
            console.log("Action not recognized:", request.action);
    }
});