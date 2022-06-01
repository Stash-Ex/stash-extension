import React, { useCallback, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from "react-redux"
import { createCache } from "../../store/metacacheSlice"
import { useAllowance, useTokenApprove, useTokenInfo } from "../../web3/hooks"
import { useAppSelector } from "../../store/hooks"
import ConnectedComponent from "../ConnectedComponent"
import { toNativeTokenAmount } from "../../web3/starknet/utils"
import AssetSelectionModal from "../ModalView/AssetSelectionModal"

const CreateCacheForm = () => {
  const [keys, setKeys] = useState([""])
  const [hint, setHint] = useState("")
  const [tokenAddress, setTokenAddress] = useState("0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10");
  const [amount, setAmount] = useState(0);
  const [isAssetSelectionModelOpen, setIsAssetSelectionModelOpen] = useState(false)

  const { currentUrl } = useAppSelector(state => state.currentUrl);
  const metacacheAddress = useAppSelector(state => state.metacache.contract?.address);
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

  const handleKeyChange = (i: number, e: any) => {
    keys[i] = e.target.value;
    setKeys([...keys]);
  }

  const handleHintChange = (e: any) => {
    setHint(e.target.value);
  }

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
    <form onSubmit={e => e.preventDefault()}>
      <h5>Assets</h5>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsAssetSelectionModelOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>
      <AssetSelectionModal
        isOpen={isAssetSelectionModelOpen}
        closeModal={() => setIsAssetSelectionModelOpen(false)} />
      <label className="text" htmlFor="tokenaddress" >Token Address:</label>
      <input
        type="text"
        id="tokenaddress"
        name="tokenaddress"
        value={tokenAddress}
        onChange={e => setTokenAddress(e.target.value)} /><br />
      <p>Name: {token?.name || "Invalid Token"}</p>
      <p>Symbol: {token?.symbol || "Invalid Token"}</p>
      <br />
      <label>Token Amount: &#32;</label>
      <input
        id="amount"
        name="amount"
        type="number"
        min="0"
        value={amount}
        onChange={e => setAmount(parseFloat(e.target.value) || 0)} /><br /><br />
      <h5>{"Keys "}
        <FontAwesomeIcon
          icon={"key"}
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
            icon={"minus-circle"}
            onClick={() => deleteKey(index)}
            size="lg"
          />
        </div>
      ))}
      <button type="button" onClick={addNewKeyInput}>Add Key</button>
      <h5>{"Hint "}
        <FontAwesomeIcon
          icon={"lightbulb-exclamation-on"}
          size="lg"
        />
      </h5>
      <textarea
        className="p-1 w-4/5"
        placeholder={`Hint goes here`}
        value={hint}
        onChange={handleHintChange}
      />
      <br />
      <ConnectedComponent>
        <button
          className="px-4 py-1 text-sm font-semibold rounded-full border border-purple-200 text-white bg-purple-600 hover:bg-purple-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          onClick={amount > 0 && allowance < amount ? approveTokenClick : createCacheOnSubmit}>
          {amount > 0 && allowance < amount ? "Approve Token" : "Create Stash"}
        </button>
      </ConnectedComponent>
    </form>
  )
}
export default CreateCacheForm;