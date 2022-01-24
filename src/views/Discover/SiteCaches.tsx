import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { getSiteCaches } from '../../web3/siteCachesSlice';

import Cache from '../../components/cache/Cache';

const SiteCaches = () => {
  const { caches } = useSelector((state: RootState) => {
    return state.siteCaches
  });
  const { currentUrl, loading } = useSelector((state: RootState) => {
    return state.currentUrl
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && currentUrl) {
      dispatch(getSiteCaches("1"));
    }
  }, [currentUrl, loading, dispatch])

  useEffect(() => {
    chrome.runtime.sendMessage({ "message": "update_cache_count", "data": caches.length })
  })

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