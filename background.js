chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "executeScript") {
    chrome.scripting.executeScript({
      target: {tabId: request.tabId},
      function: pageScript
    });
  }
});