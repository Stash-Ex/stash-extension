import { cachesAtLocation } from "../web3/lib/starknet/metacache.service";
import { number } from "starknet";


// Messages received from content script 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`request: ${request}`);
  console.log(`sender: ${JSON.stringify(sender)}`);
  if (request["message"] === "update_cache_count") {
    chrome.tabs.query({ active: true, currentWindow: true },
      function (tabs) {
        var activeTab = tabs[0];
        chrome.action.setBadgeText({ tabId: activeTab.id, text: request["data"].toString() });
      });
  }
});

// Used to toggle the content script on the page
chrome.action.onClicked.addListener(async (tab) => {
  console.log(`browseraction clicked: ${JSON.stringify(tab)}`)
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
    console.log("error")
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
