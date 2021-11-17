import React, { useState } from "react"
import CacheKey from "../cache/CacheKey"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import CacheHint from "../cache/CacheHint"

export interface CryptoAsset {
  address: string;
  amount: number;
}

const USDC_TOKEN_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";


const CreateCacheForm = () => {
  const [cacheKeys, setCacheKeys] = useState([""])
  const [cacheHints, setCacheHints] = useState([""])
  const [cacheAssets, setCacheAssets] = useState<CryptoAsset>({address: "", amount: 0} as CryptoAsset);

  const handleKeyChange = (i: number, e) => {
    cacheKeys[i] = e.target.value;
    setCacheKeys([...cacheKeys]);
  }

  const deleteKey = (i: number) => {
    cacheKeys.splice(i, 1);
    setCacheKeys([...cacheKeys]);
  }

  const handleHintChange = (i: number, e) => {
    cacheHints[i] = e.target.value;
    setCacheHints([...cacheHints]);
  }

  const deleteHint = (i: number) => {
    cacheHints.splice(i, 1);
    setCacheHints([...cacheHints]);
  }

  const addNewKeyInput = () => setCacheKeys([...cacheKeys, ""])
  const addNewHintInput = () => setCacheHints([...cacheHints, ""])


  const createCache = e => {
    e.preventDefault()
    console.log("prevented default createCache")
  }

  return (
    <form onSubmit={createCache}>
      <h3>Create Cache</h3>
      <h5>Assets</h5>
      <label>
        Token Address: 
        <input 
          type="text" 
          id="tokenaddress" 
          name="tokenaddress" 
          placeholder={USDC_TOKEN_ADDRESS}
          value={cacheAssets.address}
          onChange={e => setCacheAssets({...cacheAssets, address: e.target.value})}/><br/>
      </label>
      <label>
        Token Amount: 
        <input 
          type="number" 
          id="tokenamount" 
          name="tokenamount" 
          placeholder="10.0"
          value={cacheAssets.amount}
          onChange={e => setCacheAssets({...cacheAssets, amount: parseFloat(e.target.value)})}/><br/><br/>
      </label>
      <h5>Keys</h5>
      {cacheKeys.map((cacheKey, index) => (
        <div key={"Key" + index}>
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
      <button type="button" onClick={addNewKeyInput}>Add Key</button>
      <h5>Hints</h5>
      {cacheHints.map((cacheHint, index) => (
        <div key={"Hint" + index}>
          <CacheHint 
            index={index}
            cacheHint={cacheHint}
            handleHintChange={handleHintChange}
            />
          <FontAwesomeIcon 
            icon={faMinusCircle}
            onClick={() => deleteHint(index)}
            size="lg"
          />
        </div>
      ))}
      <button type="button" onClick={addNewHintInput}>Add Hint</button>
      <hr/>
      <button>Create Cache</button>
    </form>
  )
}
export default CreateCacheForm;