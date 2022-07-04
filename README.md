# Table of contents
- [Table of contents](#table-of-contents)
- [Stash Extension Overview](#stash-extension-overview)
  - [Some Use Cases](#some-use-cases)
- [Installation](#installation)
  - [Instructions](#instructions)
- [Using the extension](#using-the-extension)
  - [Claim a stash](#claim-a-stash)
  - [Create a Stash](#create-a-stash)
    - [Location](#location)
    - [Contents](#contents)
    - [Keys](#keys)
    - [Hint](#hint)
- [App Structure](#app-structure)
- [Available Scripts](#available-scripts)
  - [`yarn build`](#yarn-build)
- [Roadmap](#roadmap)

# Stash Extension Overview

Stash is a one of a kind browser extension that enables new interactions and engagement with the web. Built on the [Stash blockchain protocol](https://github.com/Stash-Ex/stash-protocol), this web extension allows you to stash digital assets on any website, and later discover and claim those stashes, in an entirely permissionless manner.  


## Some Use Cases
- Content creators can create stashes to reward their fans by hiding the unlock keys throughout their content, ensuring fans' engagement with the content to find all keys.
- Brands can create scavenger hunts that guide users through a series of engagement points with their products and services that award users with crypto, NFTs or discounts for their products.
- Organize private scavenger hunts across the internet.
- Individuals can create stashes to challenge friends and other community members to find the keys to the puzzle.  

Discover stashes as you browse the web and use the hints to find the keys and claim its contents.  
This extension will notify you when there is a stash on the page you are browsing as well as provide an easy to use interface to claim and create stashes.

![extension_overview](/documentation/extension_overview.png)


# Installation

This extension is designed for the Chrome web browser. It is not yet available on the extension store but can be built and installed from the source code in this repository.

> **Note**  
> The extension requires that you have the [Argent X wallet](https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb) for the [Starknet blockchain](https://starknet.io/) installed on the same browser.

## Instructions

1. Clone this repository: `git clone https://github.com/Stash-Ex/stash-extension.git`
2. Install the application dependencies: `yarn install`
3. Build the application: `yarn build`
4. In chrome, navigate to `chrome://extensions/`
5. Enable developer mode in the top right corner of the page.
6. Click the "Load unpacked" button in the top left corner and select the `build` directory that was created in step #3.
7. Clicking the "Select Folder" button will install the extension in your browser.

![install_ss](/documentation/install_extension.png)

# Using the extension

This section details how to use the extension to create and claim stashes as you browse the web.

> **Note**  
> The Stash Protocol is currently only deployed on the goerli testnet and is subject to frequent changes and deployments. This extension will be updated to use the latest version (deployed address) of the protocol which will result in stashes created in prior protocol versions not being displayed.      
> 
> All versions of the protocol are recorded in the [Stash Protocol repository](https://github.com/Stash-Ex/stash-protocol). In the event of an update you can either manually claim a stash using the [instructions in the protocol repository](https://github.com/Stash-Ex/stash-protocol#claim-a-stash), or you can change the protocol address in this repository in `src/web3/starknet/stashprotocol.service.ts` and rebuild the extension with a specific version.   

## Claim a stash
In order to claim a stash, you must first discover a stash. This extension will let you know how many stashes are on the page you are browsing. The number of stashes will be displayed on the extension's icon next to the address bar in your browser. 

Clicking the icon will open the Stash App on the right-hand side of the browser page where the Discover tab will allow you to claim a stash. 

![claim_stash](/documentation/claim_stash.png)

If this is your first time connecting starknet with the current website you will see a "Connect Wallet" button to connect to Argent-X and display your account info.  
Use the hints provided with the stash to discover the keys and enter them in the input fields. Click the "Add Key" button if the stash requires additional keys to unlock.  
Finally, the "Claim Stash" button will open an Argent-X window to sign a transaction sending the Stash ID and keys to the Stash Protocol. If you sent the correct keys, the protocol will send you the content of the stash.

You must have some ETH in your wallet in order to send the transaction.

## Create a Stash

The Stash tab allows you to create a stash with some crypto, unlock keys, and a hint.  

![create_stash](/documentation/create_stash.png)

### Location
 The stash location along with an autoincremented number is used to uniquely identify a stash in the protocol.  
 It is automatically set to the hostname of the current web page URL (not including the path).  

### Contents
Specify the crypto assets you would like to stash on the page. Currently, only ERC20 tokens are supported. Use the dropdown to select a token (defaults to [Test Token](https://goerli.voyager.online/contract/0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10)) and enter an amount. If the Stash Protocol is not approved to transfer your tokens to its account when creating the stash, the "Claim Stash" button pictured above will display "Approve Token" whereby clicking it will allow you to do so.

### Keys
At least one key must be entered to create the stash. It can be as simple as the website name or a list of keys.  
> **Warning**  
> Each key can have a maximum length of 31 characters.
  

### Hint
Arbitrary length text field to provide the user with hints to discover the keys to unlock the stash. 

<br/>
Finally, hit the "Create Stash" button to create the stash. It is recommended to record the keys offline in case you would like to redeem your tokens.  

You must have some ETH in your wallet in order to send the transaction.

<br/>

# App Structure

This is a react app chrome extension written in Typescript and interacting with the blockchain using Argent-x.    

Because chrome extensions run in their own javascript context they do not have access to the starknet object in the Argent-x context. The app uses a proxy script injected into the webpage, WalletProxy, to interface with Argent-x wallet. The proxy script communicates through document events and responses that act as promises. This proxy only needs to support getting the active address and invoking contract calls that require a signature.

The app will use its own bundled [Starknet.js](https://github.com/0xs34n/starknet.js) for all other starknet interactions. 

# Available Scripts

## `yarn build`

Builds the app for production to the `build` folder.  
It uses Craco to modify webpack and correctly bundle the app compatible with chrome extensions v3. 

# Roadmap
Please take a look at our [roadmap](https://github.com/orgs/Stash-Ex/projects/2) for details on exciting upcoming features!
