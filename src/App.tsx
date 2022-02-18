import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCurrentUrl } from './chromeServices/currentUrlSlice';

import './App.css';
import SiteCaches from './views/Discover/SiteCaches';
import NavBar from './components/navbar/NavBar';
import CacheCreations from './views/Create/CacheCreations';
import { AppState } from './store';
import { getStarknet } from './store/starknetSlice';
import ConnectedComponent from './components/ConnectedComponent';

const App = () => {
  const { account } = useSelector((state: AppState) => state.starknet);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCurrentUrl());
    dispatch(getStarknet(false));
  }, [dispatch]);


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to <code style={{ color: 'black', backgroundColor: '#A9A9A9' }}>&lt;MetaCache/&gt;</code>.<br />
          The internet-wide scavenger hunt.
        </p>
        <p>Address: <ConnectedComponent children={<p>{account}</p>} /></p>
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
