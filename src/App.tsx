import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCurrentUrl } from './chromeServices/currentUrlSlice';

import SiteCaches from './views/Discover/SiteCaches';
import NavBar from './components/navbar/NavBar';
import CacheCreations from './views/Create/CacheCreations';
import { AppState } from './store';
import { getStarknet } from './store/starknetSlice';

const App = () => {
  const { account } = useSelector((state: AppState) => state.starknet);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCurrentUrl());
    dispatch(getStarknet(false));
  }, [dispatch]);


  return (
    <div className="text-center">
      <NavBar account={account} />
      <main>
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
