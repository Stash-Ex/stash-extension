import { getCaches } from './web3.js';

const greenify = () => {
  document.body.style.backgroundColor = 'green';
}


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
        

        setTimeout(() => {
          chrome.scripting.executeScript({
            target: { tabId: currentTab.id },
            func: () => document.body.style.backgroundColor = 'green'
          });
          port.postMessage("this is the response")
        }, 3000);
      });
  }
});


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      console.log('updating tab info');
      const tabs = await chrome.tabs.query({currentWindow: true, active: true});
      try {
        const active = tabs[0];
        const caches = getCaches("url");
        chrome.action.setBadgeText({tabId: active.id, text: caches.length.toString()});
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
    const caches = [{prize: "1 ETH", hints: ["hint1", "hint2", "hint3"]}, {prize: "Punk #3357", hints: ["hint1", "hint2", "hint3"]}];//getCaches("url");
    chrome.action.setBadgeText({tabId: active.id, text: caches.length.toString()});
  } catch (error) {
    console.log(error.toString());
  }
})

export {}