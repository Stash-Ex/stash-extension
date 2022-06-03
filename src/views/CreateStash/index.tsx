import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../store';

import CreateStashForm from '../../components/forms/CreateStashForm';
import { useAppDispatch } from '../../store/hooks';
import ConnectedComponent from '../../components/ConnectedComponent';

const CreateStash = () => {
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
      <ConnectedComponent>
        <CreateStashForm />
      </ConnectedComponent>
    </div>
  )
}

export default CreateStash;