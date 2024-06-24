document.getElementById('changeColor').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "changeBackgroundColor", color: "#FFCC00"});
  });
});