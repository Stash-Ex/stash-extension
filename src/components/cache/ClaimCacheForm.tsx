import React, { useState } from "react"
import CacheKey from "./CacheKey"

const ClaimCacheForm = ({ claimCache }) => {
  const [cacheKeys, setCacheKeys] = useState([""])

  const handleKeyChange = (i: number, e) => {
    cacheKeys[i] = e.target.value;
    setCacheKeys([...cacheKeys]);
  }

  const deleteKey = (i: number) => {
    cacheKeys.splice(i, 1);
    setCacheKeys([...cacheKeys]);
  }

  const addNewKeyInput = () => setCacheKeys([...cacheKeys, ""])

  const submitClaim = e => {
    e.preventDefault()
    console.log("prevented default UnlockCache")
    claimCache(cacheKeys)
  }

  return (
    <form onSubmit={submitClaim}>
      {cacheKeys.map((cacheKey, index) => (
        <CacheKey 
          index={index}
          cacheKey={cacheKey}
          handleKeyChange={handleKeyChange}
          deleteKey={deleteKey}/>
      ))}
      <button onClick={addNewKeyInput}>Add Key</button>
      <button>Claim Cache</button>
    </form>
  )
}
export default ClaimCacheForm;