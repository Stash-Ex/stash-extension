import { getSiteCaches } from "../web3/lib/metaSiteUtils";


chrome.runtime.onConnect.addListener(async (port) => {
  if (port.name === "popup") {
      port.onDisconnect.addListener(function() {
         console.log("popup has been closed");
      });

      port.onMessage.addListener(async (message) => {
        console.log(`message received: ${message}`);
        const tabs = await chrome.tabs.query({currentWindow: true, active: true});
        const currentTab = tabs[0];
        console.log(currentTab);
        
        if (message === "getCurrentURL") {
          port.postMessage(currentTab.url);
        } else {
          chrome.scripting.executeScript({
            target: { tabId: currentTab.id },
            func: () => document.body.style.backgroundColor = 'green'
          });
          // port.postMessage("this is the response")
        }
      });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendRespons) => {
  console.log(`request: ${request}`);
  console.log(`sender: ${sender}`);
});


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log(changeInfo)
  if (changeInfo.status === "complete") {
    const tabs = await chrome.tabs.query({currentWindow: true, active: true});
    try {
      const active = tabs[0];
      const caches = await getSiteCaches(active.url);
      await chrome.action.setBadgeText({tabId: active.id, text: caches.length.toString()});
    } catch (error) {
      console.log(error.toString());
    }
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  console.log(activeInfo);
  const tabs = await chrome.tabs.query({currentWindow: true, active: true});
  try {
    const active = tabs[0];
    const caches = await getSiteCaches(active.url);
    await chrome.action.setBadgeText({tabId: active.id, text: caches.length.toString()});
  } catch (error) {
    console.log(error.toString());
  }
})
