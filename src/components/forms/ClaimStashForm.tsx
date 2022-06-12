import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { StashState, claimStash } from "../../store/stashprotocolSlice"
import { useDispatch } from "react-redux"
import ConnectedComponent from "../ConnectedComponent"

const ClaimStashForm = ({ stashInfo }: { stashInfo: StashState }) => {
  const [stashKeys, setStashKeys] = useState([""])
  const dispatch = useDispatch();

  const handleKeyChange = (i: number, e) => {
    stashKeys[i] = e.target.value;
    setStashKeys([...stashKeys]);
  }

  const deleteKey = (i: number) => {
    stashKeys.splice(i, 1);
    setStashKeys([...stashKeys]);
  }

  const addNewKeyInput = () => setStashKeys([...stashKeys, ""])

  const submitClaim = e => {
    const args = { location: stashInfo.location, id: stashInfo.id, keys: stashKeys };
    dispatch(claimStash(args))
  }

  return (
    <>
      <div>
        {stashKeys.map((stashKey, index) => (
          <div key={"Key" + index}>
            <input
              type="text"
              placeholder={`Key Part #${index + 1}`}
              value={stashKey}
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