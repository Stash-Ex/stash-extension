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
      <h1>Create Caches on:</h1>
      <h3>{currentUrl}</h3>
      <CreateCacheForm />
    </div>
  )
}

export default CacheCreations;