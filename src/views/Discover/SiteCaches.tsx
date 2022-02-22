import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Cache from '../../components/cache/Cache';
import { getNumCaches, loadCaches } from '../../store/metacacheSlice';
import { useAppSelector } from '../../store/hooks';

const SiteCaches = () => {
  const { currentUrl } = useAppSelector(state => state.currentUrl);
  const { cacheCount, contract, caches } = useAppSelector(state => state.metacache);
  const blockNumber = useAppSelector(state => state.starknet.blockHash);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUrl) {
      dispatch(getNumCaches(currentUrl))
    }
  }, [dispatch, currentUrl, contract])

  useEffect(() => {
    if (cacheCount > 0 && caches.length === 0 && currentUrl) {
      dispatch(loadCaches(currentUrl));
    }
  }, [dispatch, cacheCount, currentUrl, caches, blockNumber])

  return (
    <div>
      <h1>Scavenging Page</h1>
      <h3>{currentUrl}</h3>
      <p>Number of caches on page: {JSON.stringify(cacheCount)}</p>
      {caches.map((data, index) => (
        <Cache key={index} data={data} />
      ))}
    </div>
  )
}

export default SiteCaches;