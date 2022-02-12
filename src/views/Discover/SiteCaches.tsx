import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';

import Cache from '../../components/cache/Cache';
import { getNumCaches, loadCaches } from '../../web3/metacacheSlice';

const SiteCaches = () => {
  const { currentUrl } = useSelector((state: RootState) => state.currentUrl);
  const { cacheCount, contract, caches } = useSelector((state: RootState) => state.metacache);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUrl) {
      dispatch(getNumCaches(currentUrl))
    }
  }, [dispatch, currentUrl, contract])

  useEffect(() => {
    if (cacheCount > 0 && currentUrl) {
      dispatch(loadCaches({ location: currentUrl, pageSize: 5 }));
    }
  }, [dispatch, cacheCount, currentUrl])

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