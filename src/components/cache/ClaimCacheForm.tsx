import React, { useState } from "react"
import CacheKey from "./CacheKey"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

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
        <div>
          <CacheKey 
            index={index}
            cacheKey={cacheKey}
            handleKeyChange={handleKeyChange}/>
          <FontAwesomeIcon 
            icon={faMinusCircle}
            onClick={() => deleteKey(index)}
            size="lg"
          />
        </div>
      ))}
      <button onClick={addNewKeyInput}>Add Key</button>
      <button>Claim Cache</button>
    </form>
  )
}
export default ClaimCacheForm;