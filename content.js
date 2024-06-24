chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "changeBackgroundColor") {
    document.body.style.backgroundColor = request.color;
  }
});console.log("Content script loaded by My First Extension.");