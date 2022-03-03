/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Frame, { FrameContextConsumer } from 'react-frame-component';

import './index.css';
import App from './App';

import { store } from './store';

// insert font awesome styles in iframe css as they are separately included in bundle
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const getChromeOrLocalFile = (filePath: string) => {
  try {
    return chrome.runtime.getURL(filePath);
  } catch (e) {
    return 'http://localhost:3000' + filePath
  }
}


const AppFrame = () => {
  return (
    <Frame head={[<link type="text/css" rel="stylesheet" href={getChromeOrLocalFile("/static/css/main.css")} ></link>, <style>${dom.css()}</style>]}>
      <FrameContextConsumer>
        {
          // Callback is invoked with iframe's window and document instances
          ({ document, window }) => {
            return (
              <Provider store={store}>
                <MemoryRouter>
                  <App />
                </MemoryRouter>
              </Provider>
            )
          }
        }
      </FrameContextConsumer>
    </Frame>
  )
}

const app = document.createElement('div');
app.id = "metacache-extension-root";

// Toggle app on and off
try {
  app.style.display = "none";
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.message === "clicked_browser_action") {
        toggle();
      }
    }
  );
} catch (e) {
  console.log(`Exception: ${e}`)
  toggle();
}

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}

// attach walletproxy for listener setup
var s = document.createElement('script');
s.src = getChromeOrLocalFile('/static/js/walletProxy.js');
s.onload = function () {
  //@ts-ignore
  this.remove();
  console.log('walletProxy script loaded')

  // Attach and render app only after walletProxy loads, after the walletProxy listeners are configured
  document.body.appendChild(app);
  ReactDOM.render(<AppFrame />, app);
};
(document.head || document.documentElement).appendChild(s);


