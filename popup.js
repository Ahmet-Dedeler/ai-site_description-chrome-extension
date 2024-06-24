document.getElementById('clickme').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.runtime.sendMessage({action: "executeScript", tabId: tabs[0].id});
    });
});