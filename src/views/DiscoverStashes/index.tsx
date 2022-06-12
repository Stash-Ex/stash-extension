import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Stash from '../../components/stash/Stash';
import { getNumStashes, loadStashes } from '../../store/stashprotocolSlice';
import { useAppSelector } from '../../store/hooks';

const DiscoverStashes = () => {
  const { currentUrl } = useAppSelector(state => state.currentUrl);
  const { stashCount, contract, stashes } = useAppSelector(state => state.stashprotocol);
  const blockNumber = useAppSelector(state => state.starknet.blockHash);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUrl) {
      dispatch(getNumStashes(currentUrl))
    }
  }, [dispatch, currentUrl, contract])

  useEffect(() => {
    if (stashCount > 0 && stashes.length === 0 && currentUrl) {
      dispatch(loadStashes(currentUrl));
    }
  }, [dispatch, stashCount, currentUrl, stashes, blockNumber])

  return (
    <div>
      <h2 className='font-mono text-2xl'>Stash List</h2>
      <p className='text-lg'><span className='text-red-500'>{stashCount}</span> stashes on <span className='font-bold'>{currentUrl}</span></p>
      {stashes.map((stash, index) => (
        <div className='py-8 px-8 max-w-sm mx-auto rounded-xl shadow-lg space-y-2'>
          <Stash key={index.toString()} stash={stash} />
        </div>
      ))}
    </div>
  )
}

export default DiscoverStashes;