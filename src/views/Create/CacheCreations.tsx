import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../../store';

import CreateCacheForm from '../../components/forms/CreateCacheForm';
import { useAppDispatch } from '../../store/hooks';

const CacheCreations = () => {
  const { currentUrl, loading } = useSelector((state: AppState) => state.currentUrl);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loading && currentUrl) {
      // dispatch(getSiteCaches(currentUrl));
    }
  }, [currentUrl, loading, dispatch]);


  return (
    <div>
      <p className='text-2xl font-semibold mb-4'>Create a stash!</p>
      <CreateCacheForm />
    </div>
  )
}

export default CacheCreations;