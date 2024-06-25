chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({text: 'ON'});
  chrome.action.setBadgeBackgroundColor({color: '#4688F1'});

  chrome.contextMenus.create({
    id: "sampleContextMenu",
    title: "Sample Context Menu",
    contexts: ["selection"]
  });

  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/icon48.png',
    title: 'Notification Title',
    message: 'This is a sample notification message.'
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sampleContextMenu") {
    console.log("You clicked the context menu!", info.selectionText);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "executeScript") {
    chrome.scripting.executeScript({
      target: {tabId: request.tabId},
      function: pageScript
    });
  }
});

function pageScript() {
  // Example function to be executed in the context of the webpage
  console.log('Page script executed.');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "triggerNotification") {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'images/icon48.png',
            title: 'User Triggered Notification',
            message: 'This notification was triggered by the user.'
        });
    }
    if (request.action === "toggleDarkTheme") {
      console.log("Dark theme toggled.");
  }
});