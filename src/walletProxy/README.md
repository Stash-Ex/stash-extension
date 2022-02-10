WalletProxy is used to interface with argent-x wallet through a content script injected into the webpage. This is necessary because the chrome extension runs in a separate javascript context and cannot access the starknet.js in the argent-x context.

This proxy only needs to support invoke contract and get active address. This app will use its own starknet.js bundled in the extension. 