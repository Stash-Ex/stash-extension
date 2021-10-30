import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUrl } from './chromeServices/currentUrlSlice';

import './App.css';
import SiteCaches from './components/cache/SiteCaches';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getCurrentUrl());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to <code style={{color: 'black', backgroundColor: '#A9A9A9'}}>Meta</code>Cache.<br/>
          The internet-wide scavenger hunt.
        </p>
      </header>
      <main>
        <SiteCaches />
      </main>
    </div>
  );
}

export default App;
