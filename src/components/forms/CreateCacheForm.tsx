import React, { useCallback, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faLightbulb, faKey } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux"
import { createCache } from "../../store/metacacheSlice"
import { useAllowance, useTokenApprove, useTokenInfo } from "../../web3/hooks"
import { useAppSelector } from "../../store/hooks"
import ConnectedComponent from "../ConnectedComponent"
import { toNativeTokenAmount } from "../../web3/starknet/utils"


const CreateCacheForm = () => {
  const [keys, setKeys] = useState([""])
  const [hint, setHint] = useState([""])
  const [tokenAddress, setTokenAddress] = useState("0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10");
  const [amount, setAmount] = useState(0);

  const { currentUrl } = useAppSelector(state => state.currentUrl);
  const metacacheAddress = useAppSelector(state => state.metacache.contract.connectedTo);
  const { account } = useAppSelector(state => state.starknet)

  const token = useTokenInfo(tokenAddress);
  const allowance = useAllowance(token, account, metacacheAddress);
  const { invokeTokenApprove } = useTokenApprove(token.address);
  const dispatch = useDispatch();

  const addNewKeyInput = () => setKeys([...keys, ""])

  const deleteKey = (i: number) => {
    keys.splice(i, 1);
    setKeys([...keys]);
  }

  const handleKeyChange = useCallback((i: number, e: any) => {
    keys[i] = e.target.value;
    setKeys([...keys]);
  }, [keys]);

  const handleHintChange = useCallback((e: any) => {
    setHint(e.target.value);
  }, [])

  const createCacheOnSubmit = useCallback((e) => {
    const args = {
      location: currentUrl,
      token: tokenAddress,
      amount: toNativeTokenAmount(amount, token.decimals),
      keys,
      hint
    }
    dispatch(createCache(args))
  }, [amount, token.decimals, dispatch, currentUrl, tokenAddress, keys, hint])

  const approveTokenClick = e => {
    invokeTokenApprove && invokeTokenApprove(metacacheAddress, toNativeTokenAmount(amount, token?.decimals))
    console.log("Approving")
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <h5>Assets</h5>
        <label>
          Token Address:
          <input
            type="text"
            id="tokenaddress"
            name="tokenaddress"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)} /><br />
        </label>
        <p>Name: {token?.name || "Invalid Token"}</p>
        <p>Symbol: {token?.symbol || "Invalid Token"}</p>
        <br />
        <label>
          Token Amount: &#32;
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={e => setAmount(parseFloat(e.target.value) || 0)} /><br /><br />
        </label>
        {amount > 0 && allowance < amount ?
          <ConnectedComponent>
            <button onClick={approveTokenClick}>Approve Token</button>
            <p>Need to approve spend by metacache contract.</p>
          </ConnectedComponent>
          :
          <></>
        }
        <h5>{"Keys "}
          <FontAwesomeIcon
            icon={faKey}
            size="lg"
          />
        </h5>
        {keys.map((cacheKey, index) => (
          <div key={"Key" + index}>
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
        <button type="button" onClick={addNewKeyInput}>Add Key</button>
        <h5>{"Hint "}
          <FontAwesomeIcon
            icon={faLightbulb}
            size="lg"
          />
        </h5>
        <input
          type="text"
          placeholder={`Hint goes here`}
          value={hint}
          onChange={handleHintChange}
        />
      </form>
      <br />
      <ConnectedComponent>
        <button onClick={createCacheOnSubmit} disabled={amount === 0 || allowance < amount}>Create Cache</button>
      </ConnectedComponent>
    </div>
  )
}
export default CreateCacheForm;