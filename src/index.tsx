/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Frame, { FrameContextConsumer }from 'react-frame-component';

import './index.css';
import App from './App';

import { store } from './store';


const AppFrame = () => {
  return (
    <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/main.css")} ></link>]}> 
      <FrameContextConsumer>
        {
        // Callback is invoked with iframe's window and document instances
            ({document, window}) => {
              // Render Children
              return (
                <Provider store={store}>
                  <App />
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

ReactDOM.render(
  <AppFrame />,
  app
);

app.style.display = "none";
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);

function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}