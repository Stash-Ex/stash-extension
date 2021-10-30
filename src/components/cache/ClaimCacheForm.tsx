import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const ClaimCacheForm = ({ claimCache }) => {
  const [cacheKeys, setCacheKeys] = useState([""])

  const handleKeyChange = (i, e) => {
    cacheKeys[i] = e.target.value;
    setCacheKeys([...cacheKeys]);
  }

  const deleteKey = i => {
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
      {cacheKeys.map((claimKey, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Key Part #${index+1}`}
            value={claimKey}
            onChange={e => handleKeyChange(index, e)}
          />
          <FontAwesomeIcon icon={faMinusCircle} onClick={() => deleteKey(index)} style={{marginLeft: '5px'}}/>
        </div>
      ))}
      <button onClick={addNewKeyInput}>Add Key</button>
      <button>Claim Cache</button>
    </form>
  )
}
export default ClaimCacheForm;