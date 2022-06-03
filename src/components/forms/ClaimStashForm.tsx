import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { CacheState, claimCache } from "../../store/metacacheSlice"
import { useDispatch } from "react-redux"
import ConnectedComponent from "../ConnectedComponent"

const ClaimStashForm = ({ cacheInfo }: { cacheInfo: CacheState }) => {
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
      <div>
        {cacheKeys.map((cacheKey, index) => (
          <div key={"Key" + index}>
            <input
              type="text"
              placeholder={`Key Part #${index + 1}`}
              value={cacheKey}
              onChange={e => handleKeyChange(index, e)}
            />
            <FontAwesomeIcon
              className="ml-1"
              icon={faMinusCircle}
              onClick={() => deleteKey(index)}
            />
          </div>
        ))}
        <button className="btn-primary" onClick={addNewKeyInput}>Add Key</button>
      </div>
      <div>
        <ConnectedComponent><button className="btn-primary" onClick={submitClaim}>Claim Stash</button></ConnectedComponent>
      </div>
    </>
  )
}
export default ClaimStashForm;