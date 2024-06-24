chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "changeBackgroundColor") {
    document.body.style.backgroundColor = request.color;
    console.log(`Background color changed to ${request.color}`);
  }
});