import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Cache from '../../components/cache/Cache';
import { getNumCaches, loadCaches } from '../../store/metacacheSlice';
import { useAppSelector } from '../../store/hooks';

const styles = {
  card: {
    backdropFilter: 'blur(6px) saturate(157%)',
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 12,
    border: '1px solid rgba(209, 213, 219, 0.3)',
  }
}

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
      <h2>Caches found on: <span id="cacheLocation">{currentUrl}</span></h2>
      <p>Number of caches on page: {cacheCount}</p>
      {caches.map((cache, index) => (
        <div style={styles.card}>
          <Cache key={index.toString()} cache={cache} />
        </div>
      ))}
    </div>
  )
}

export default SiteCaches;