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
      <h2>Caches found on: <span id="cacheLocation">{currentUrl}</span></h2>
      <p>Number of caches on page: {cacheCount}</p>
      {caches.map((cache, index) => (
        <div className='py-8 px-8 max-w-sm mx-auto bg-red rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
          <Cache key={index.toString()} cache={cache} />
        </div>
      ))}
    </div>
  )
}

export default SiteCaches;