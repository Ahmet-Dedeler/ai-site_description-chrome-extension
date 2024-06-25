document.getElementById('changeColor').addEventListener('click', () => {
    const color = document.getElementById('colorChoice').value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "changeBackgroundColor", color: color});
    });
});

document.getElementById('triggerNotification').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "triggerNotification"});
});

document.getElementById('applyFontSize').addEventListener('click', () => {
    chrome.storage.sync.get('fontSize', (data) => {
        const fontSize = data.fontSize;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "applyFontSize", fontSize: fontSize});
        });
    });
});

document.getElementById('toggleDarkTheme').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleDarkTheme"});
    });
});