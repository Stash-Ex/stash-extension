import React, { useState } from "react"
import CacheKey from "../cache/CacheKey"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import CacheHint from "../cache/CacheHint"

export interface CryptoAsset {
  address: string;
  amount: number;
}

const TST_TOKEN_ADDRESS = "0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10";


const CreateCacheForm = () => {
  const [cacheKeys, setCacheKeys] = useState([""])
  const [cacheHint, setCacheHints] = useState([""])
  const [cacheAssets, setCacheAssets] = useState<CryptoAsset>({ address: "", amount: 0 } as CryptoAsset);

  const addNewKeyInput = () => setCacheKeys([...cacheKeys, ""])

  const deleteKey = (i: number) => {
    cacheKeys.splice(i, 1);
    setCacheKeys([...cacheKeys]);
  }
  const handleKeyChange = (i: number, e: any) => {
    cacheKeys[i] = e.target.value;
    setCacheKeys([...cacheKeys]);
  }

  const handleHintChange = (e: any) => {
    setCacheHints(e.target.value);
  }

  const createCacheOnSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <form onSubmit={createCacheOnSubmit}>
      <h3>Create Cache</h3>
      <h5>Assets</h5>
      <label>
        Token Address:
        <input
          type="text"
          id="tokenaddress"
          name="tokenaddress"
          placeholder={TST_TOKEN_ADDRESS}
          value={cacheAssets.address}
          onChange={e => setCacheAssets({ ...cacheAssets, address: e.target.value })} /><br />
      </label>
      <label>
        Token Amount:
        <input
          type="number"
          id="tokenamount"
          name="tokenamount"
          placeholder="10.0"
          value={cacheAssets.amount}
          onChange={e => setCacheAssets({ ...cacheAssets, amount: parseFloat(e.target.value) })} /><br /><br />
      </label>
      <h5>Keys</h5>
      {cacheKeys.map((cacheKey, index) => (
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
        cacheHint={cacheHint}
        handleHintChange={handleHintChange}
      />
      <br />
      <br />
      <button>Create Cache</button>
    </form>
  )
}
export default CreateCacheForm;