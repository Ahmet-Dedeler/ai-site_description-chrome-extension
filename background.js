chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: pageScript
  });
});

function pageScript() {
  // Your code to run on the current page
  alert("Hello from my Chrome extension!");
}