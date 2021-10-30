import React from "react"

import ClaimCacheForm from './ClaimCacheForm';

const Cache = ({ cache }) => {
  
  const claimCache = unlockKeys => {
    console.log(`Claiming Cache: ${unlockKeys}`)
  }

  return (
    <div className="cache">
      <h1>Contents: {cache.prize}</h1>
      <ul>
        {cache.hints.map((hint, index) => 
          <li key={index}>{hint}</li>
        )}
      </ul>
      <ClaimCacheForm claimCache={claimCache}/>
    </div>
  )
}

export default Cache;