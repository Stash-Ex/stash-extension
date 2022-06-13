# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It provides a build script to create a react-based chrome extension. 
The build process uses craco to produce a build that is compatible with chrome extensions manifest v3.

## App Structure
Because chrome extensions run in their own javascript context, they do not have access to the starknet object in the Argent-x context. The app uses a proxy script, WalletProxy, to interface with Argent-x wallet through a content script injected into the webpage. Messages are passed through the document 

This proxy only needs to support invoke contract and get active address. The react app will use its own starknet.js bundled in the extension. 

## Available Scripts

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
