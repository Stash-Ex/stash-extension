import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCurrentUrl } from './chromeServices/currentUrlSlice';

import './App.css';
import SiteCaches from './views/Discover/SiteCaches';
import NavBar from './components/navbar/NavBar';
import CacheCreations from './views/Create/CacheCreations';
import { RootState } from './store';
import { getStarknet } from './web3/starknetSlice';

const App = () => {
  const { account, loading } = useSelector((state: RootState) => state.starknet);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCurrentUrl());
    dispatch(getStarknet(false))
  }, [dispatch, account]);


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to <code style={{ color: 'black', backgroundColor: '#A9A9A9' }}>&lt;MetaCache/&gt;</code>.<br />
          The internet-wide scavenger hunt.
        </p>
        <p>Address: {
          account && !loading ?
            account :
            <button onClick={() => dispatch(getStarknet(true))}>Connect Wallet</button>
        }
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
