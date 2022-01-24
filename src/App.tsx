import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCurrentUrl } from './chromeServices/currentUrlSlice';

import './App.css';
import SiteCaches from './views/Discover/SiteCaches';
import NavBar from './components/navbar/NavBar';
import CacheCreations from './views/Create/CacheCreations';

const App = () => {

  const dispatch = useDispatch();
  // const [isConnected, setIsConnected] = useState(isWalletConnected())
  const [address, setAddress] = useState<string>()

  useEffect(() => {
    dispatch(getCurrentUrl());
  }, [dispatch]);

  const handleConnectClick = async () => {
    // setIsConnected(isWalletConnected())
    // setAddress(await walletAddress())
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to <code style={{ color: 'black', backgroundColor: '#A9A9A9' }}>&lt;MetaCache&gt;</code>.<br />
          The internet-wide scavenger hunt.
        </p>
      </header>
      <main>
        <NavBar />
        <Switch>
          <Route exact path="/Claim" component={SiteCaches} />
          <Route exact path="/">
            <Redirect to="/Claim" />
          </Route>
          <Route exact path="/Create" component={CacheCreations} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
