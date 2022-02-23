import React, { useState } from "react"
import CacheKey from "../cache/CacheKey"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { CacheState, claimCache } from "../../store/metacacheSlice"
import { useDispatch } from "react-redux"

const ClaimCacheForm = ({ cacheInfo }: { cacheInfo: CacheState }) => {
  const [cacheKeys, setCacheKeys] = useState([""])
  const dispatch = useDispatch();

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
    const args = { location: cacheInfo.location, id: cacheInfo.id, keys: cacheKeys };
    dispatch(claimCache(args))
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        {cacheKeys.map((cacheKey, index) => (
          <div key={"Key" + index}>
            <FontAwesomeIcon
              icon={faKey}
              size="lg"
            />
            <input
              type="text"
              placeholder={`Key Part #${index + 1}`}
              value={cacheKey}
              onChange={e => handleKeyChange(index, e)}
            />
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => deleteKey(index)}
              size="lg"
            />
          </div>
        ))}
        <button onClick={addNewKeyInput}>Add Key</button>
      </form>
      <button onClick={submitClaim}>Claim Cache</button>
    </>
  )
}
export default ClaimCacheForm;