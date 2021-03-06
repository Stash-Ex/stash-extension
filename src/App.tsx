import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCurrentUrl } from './chromeServices/currentUrlSlice';

import DiscoverStashes from './views/DiscoverStashes'
import NavBar from './components/navbar/NavBar';
import CreateStash from './views/CreateStash';
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
      <div className='flex flex-col justify-center h-36 bg-gray-700 text-center text-white'>
        <p className='text-xl'>
          Welcome to <code className='text-red-500 font-medium'>Stash</code>
        </p>
        <p className='text-sm'>
          A metaverse thing
        </p>
      </div>
      <NavBar account={account} />
      <main className='py-2 px-2'>
        <Switch>
          <Route exact path="/Claim" component={DiscoverStashes} />
          <Route exact path="/">
            <Redirect to="/Claim" />
          </Route>
          <Route exact path="/Create" component={CreateStash} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
