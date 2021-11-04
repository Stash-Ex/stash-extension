import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { getSiteCaches } from '../../web3/siteCachesSlice';

import Cache from './Cache';

const SiteCaches = () => {
  const { caches } = useSelector((state: RootState) => {
    console.log("siteCaches" + JSON.stringify(state));
    return state.siteCaches
  });
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
      <h1>Scavenging Page</h1>
      <h3>{currentUrl}</h3>
      {caches.map((cache, index) => (
        <Cache key={index} cache={cache} />
      ))}
    </div>
  )
}

export default SiteCaches;