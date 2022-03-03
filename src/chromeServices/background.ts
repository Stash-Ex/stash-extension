// main handler for messages received from content script 
chrome?.runtime?.onMessage?.addListener((request, sender, sendResponse) => {
  if (request["message"] === "update_cache_count") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      var activeTab = tabs[0];
      chrome.action.getBadgeText({ tabId: activeTab.id }, (currentBadgeText) => {
        const badgeText = request["data"]
        if (badgeText !== currentBadgeText) {
          chrome.action.setBadgeText({ tabId: activeTab.id, text: badgeText });
        }
      })
    });
  }
});

// Used to toggle the content script on the page
chrome?.action?.onClicked?.addListener(async (tab) => {
  try {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true },
      function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id,
          { "message": "clicked_browser_action" }
        );
      });
  } catch (e) {
    console.error(e)
  }
})

// Can't use starknet.js in service worker due to dependence on axios
// https://github.com/axios/axios/issues/1219
// chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
//   console.log("onUpdated: " + JSON.stringify(changeInfo))
//   if (changeInfo.status === "complete") {
//     const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
//     try {
//       const active = tabs[0];
//       const numCachesResult = await cachesAtLocation("1", "goerli-alpha");
//       console.log(numCachesResult)

//       const numCaches = number.toBN(numCachesResult.result[0])
//       console.log(numCaches.toString())
//       await chrome.action.setBadgeText({ tabId: active.id, text: numCaches.toString() });
//     } catch (error) {
//       console.log(error.toString());
//     }
//   }
// });

export { };