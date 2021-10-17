import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Caches from './components/cache/Caches';



const App = () => {
  const [logs, setLogs] = useState([]);
  const log = (message) => {
    const logList = [...logs];
    logList.push(`Log: ${message}`);
    setLogs(logList);
  } 

  const port = chrome.runtime.connect({ name: "popup" });
  port.onMessage.addListener((message) => {
    log(`received message: ${message}`);
  })
  
  const buttonAction = () => {
    port.postMessage("Message from UI");
    log(`Posted message to port ${port.name}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to <code style={{color: 'black', backgroundColor: '#A9A9A9'}}>Meta</code>Cache. The internet-wide scavenger hunt.
        </p>
      </header>
      <main>
        <Caches />
      </main>
    </div>
  );
}

export default App;
