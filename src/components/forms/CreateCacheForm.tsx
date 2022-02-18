import React, { useState } from "react"
import CacheKey from "../cache/CacheKey"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import CacheHint from "../cache/CacheHint"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../../store"
import { createCache } from "../../store/metacacheSlice"

const CreateCacheForm = () => {
  const [keys, setKeys] = useState([""])
  const [hint, setHint] = useState([""])
  const [tokenAddress, setTokenAddress] = useState("0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10");
  const [tokenName, setTokenName] = useState("TST");
  const [amount, setAmount] = useState(0);

  const { currentUrl } = useSelector((state: AppState) => state.currentUrl);
  const dispatch = useDispatch();

  const addNewKeyInput = () => setKeys([...keys, ""])

  const deleteKey = (i: number) => {
    keys.splice(i, 1);
    setKeys([...keys]);
  }
  const handleKeyChange = (i: number, e: any) => {
    keys[i] = e.target.value;
    setKeys([...keys]);
  }

  const handleHintChange = (e: any) => {
    setHint(e.target.value);
  }

  const createCacheOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createCache({ location: currentUrl, token: tokenAddress, amount, keys, hint }))
  }

  return (
    <form onSubmit={createCacheOnSubmit}>
      <h3>Create Cache</h3>
      <h5>Assets</h5>
      <p>Token Name: {tokenName}</p>
      <label>
        Token Address:
        <input
          type="text"
          id="tokenaddress"
          name="tokenaddress"
          value={tokenAddress}
          onChange={e => setTokenAddress(e.target.value)} /><br />
      </label>
      <label>
        Token Amount:
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value))} /><br /><br />
      </label>
      <h5>Keys</h5>
      {keys.map((cacheKey, index) => (
        <div key={"Key" + index}>
          <CacheKey
            index={index}
            cacheKey={cacheKey}
            handleKeyChange={handleKeyChange} />
          <FontAwesomeIcon
            icon={faMinusCircle}
            onClick={() => deleteKey(index)}
            size="lg"
          />
        </div>
      ))}
      <button type="button" onClick={addNewKeyInput}>Add Key</button>
      <h5>Hint
        <FontAwesomeIcon
          icon={faLightbulb}
          size="lg"
        />
      </h5>
      <CacheHint
        cacheHint={hint}
        handleHintChange={handleHintChange}
      />
      <br />
      <br />
      <button>Create Cache</button>
    </form>
  )
}
export default CreateCacheForm;