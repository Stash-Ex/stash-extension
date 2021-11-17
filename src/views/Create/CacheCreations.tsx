import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { getSiteCaches } from '../../web3/siteCachesSlice';

import CreateCacheForm from '../../components/cache/CreateCacheForm';

const CacheCreations = () => {
  const { currentUrl, loading } = useSelector((state: RootState) => {
    console.log("currentUrl" + JSON.stringify(state));
    return state.currentUrl
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && currentUrl) {
      dispatch(getSiteCaches(currentUrl));
    }
  }, [currentUrl, loading, dispatch])

  return (
    <div>
      <h1>Your Caches on:</h1>
      <h3>{currentUrl}</h3>
      <div>
        <p>Your caches will go here...</p>
      </div>
      <CreateCacheForm />
    </div>
  )
}

export default CacheCreations;