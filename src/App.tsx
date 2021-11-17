import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCurrentUrl } from './chromeServices/currentUrlSlice';

import './App.css';
import SiteCaches from './components/cache/SiteCaches';
import NavBar from './components/navbar/NavBar';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getCurrentUrl());
  }, [dispatch]);

  return (
    
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to <code style={{color: 'black', backgroundColor: '#A9A9A9'}}>&lt;MetaCache&gt;</code>.<br/>
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
          <Route exact path="/Create" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
