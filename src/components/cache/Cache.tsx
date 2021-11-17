import React from "react"
import CacheHint from "./CacheHint";

import ClaimCacheForm from './ClaimCacheForm';

const Cache = ({ cache }) => {
  
  const claimCache = unlockKeys => {
    console.log(`Claiming Cache: ${unlockKeys}`)
  }

  return (
    <div className="cache">
      <h4>Contents: {cache.prize}</h4>
      {cache.hints.map((hint, index) => 
        <div>
          <CacheHint index={index} cacheHint={hint}/>
        </div>
      )}
      <ClaimCacheForm claimCache={claimCache}/>
    </div>
  )
}

export default Cache;