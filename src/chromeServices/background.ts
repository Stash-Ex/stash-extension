// import { getSiteCaches } from "../web3/lib/metaSiteUtils";

const caches = [
  {id: "id1", prize: "1 ETH", hints: ["hint1", "hint2", "hint3"]},
  {id: "id2", prize: "Punk #3357", hints: ["hint1", "hint2", "hint3"]}
]

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
  console.log("Background onUpdated");
  if (changeInfo.status === "complete") {
    console.log('updating tab info');
    const tabs = await chrome.tabs.query({currentWindow: true, active: true});
    try {
      const active = tabs[0];
      // const caches = await getSiteCaches("url");
      // console.log("Got Caches in background onUpdated");
      // console.log(caches);
      await chrome.action.setBadgeText({tabId: active.id, text: caches.length.toString()});
    } catch (error) {
      console.log(error.toString());
    }
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  console.log(activeInfo);
  console.log("Background onActivated");
  const tabs = await chrome.tabs.query({currentWindow: true, active: true});
  try {
    const active = tabs[0];
    // const caches = await getSiteCaches("url");
    // console.log("Got Caches in background onActivated");
    // console.log(caches);
    await chrome.action.setBadgeText({tabId: active.id, text: caches.length.toString()});
  } catch (error) {
    console.log(error.toString());
  }
})

export {}