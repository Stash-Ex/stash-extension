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

// insert regular css in iframe to keep separate from page css.
const getCss = () => {
  try {
    return chrome.runtime.getURL("/static/css/main.css")
  } catch (e) {
    console.log(`Exception: ${e}`)
    return "http://localhost:3000/static/css/main.css"
  }
}

const AppFrame = () => {
  return (
    <Frame head={[<link type="text/css" rel="stylesheet" href={getCss()} ></link>, <style>${dom.css()}</style>]}>
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
document.body.appendChild(app);

ReactDOM.render(<AppFrame />, app);

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
  app.style.display = "block";
}

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
    document.dispatchEvent(new CustomEvent('WALLET_PROXY', {
      detail: { request: 'get_starknet_address' }
    }))
  } else {
    app.style.display = "none";
  }
}

// attach walletProxy
var s = document.createElement('script');
s.src = chrome.runtime.getURL('/static/js/walletProxy.js');
s.onload = function () {
  //@ts-ignore
  this.remove();
  console.log('walletProxy script loaded')
};
(document.head || document.documentElement).appendChild(s);

// Event listener
document.addEventListener('STARKNET_WALLET_RESPONSE', ({ detail }: CustomEvent) => {
  // alert(JSON.stringify(e));
  console.log("REACT EVENT LISTENER")
  console.log(JSON.stringify(detail))
});



