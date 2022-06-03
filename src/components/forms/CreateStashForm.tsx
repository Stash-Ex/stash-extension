import React, { useCallback, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from "@fortawesome/free-regular-svg-icons"
import { faKey, faMinusCircle, faGlobe, faCoins, faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { createCache } from "../../store/metacacheSlice"
import { useAllowance, useTokenApprove, useTokenInfo } from "../../web3/hooks"
import { useAppSelector } from "../../store/hooks"
import ConnectedComponent from "../ConnectedComponent"
import { toNativeTokenAmount } from "../../web3/starknet/utils"
import AssetSelectionModal from "../ModalView/AssetSelectionModal"
import { VoyagerLink } from "../VoyagerLink"

const CreateStashForm = () => {
  const [keys, setKeys] = useState([""])
  const [hint, setHint] = useState("")
  const [tokenAddress, setTokenAddress] = useState("0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10");
  const [amount, setAmount] = useState(0);
  const [isTokenSelectionModalOpen, setIsTokenSelectionModalOpen] = useState(false)

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
      <div className="m-3">
        <h2 className="font-bold text-xl">Location <FontAwesomeIcon icon={faGlobe} /></h2>
        <p className="text-xs">Where your stash can be found in the metaverse.</p>
      </div>
      <p className="self-end font-semibold text-lg">{currentUrl}</p>
      <hr className="p-2 m-2" />
      <div className="mb-3">
        <h2 className="font-bold text-xl">Contents <FontAwesomeIcon icon={faCoins} /></h2>
        <p className="text-xs">Select crypto to stash away.</p>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex flex-row justify-center items-start">
          <div className="m-1 flex-1">
            <button
              className="border border-red-200 text-white bg-primary-600 hover:bg-primary-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 py-2 px-4 text-center rounded-2xl"
              onClick={() => setIsTokenSelectionModalOpen(true)}>
              {token?.symbol || "Select Token"} <FontAwesomeIcon icon={faAngleDown} />
            </button>
            <p className="text-sm"><VoyagerLink.Contract contract={token?.address} text={token?.name} /></p>
          </div>
          <div className="m-1 flex-1">
            <input
              className="text-right rounded-xl h-full mr-1"
              id="amount"
              name="amount"
              type="number"
              min="0"
              value={amount}
              onChange={e => setAmount(parseFloat(e.target.value) || 0)} />
          </div>
        </div>
        <AssetSelectionModal
          isOpen={isTokenSelectionModalOpen}
          closeModal={() => setIsTokenSelectionModalOpen(false)}
          onSubmit={(tokenAddress: string) => setTokenAddress(tokenAddress)} />
      </div>

      <hr className="p-2 m-2" />

      <div className="mb-3">
        <h2 className="font-bold text-xl">Keys <FontAwesomeIcon icon={faKey} /></h2>
        <p className="text-xs">Enter keys that can unlock the stash.</p>
      </div>
      {keys.map((cacheKey, index) => (
        <div className="m-2" key={"Key" + index}>
          <input
            className="m-1"
            type="text"
            placeholder={`Key #${index + 1}`}
            value={cacheKey}
            maxLength={30}
            onChange={e => handleKeyChange(index, e)}
          />
          <FontAwesomeIcon
            className="ml-1"
            icon={faMinusCircle}
            onClick={() => deleteKey(index)}
          />
        </div>
      ))}
      <button
        className="btn-primary"
        type="button" onClick={addNewKeyInput}>Add Key
      </button>

      <hr className="p-2 m-2" />

      <div className="mb-3">
        <h2 className="font-bold text-xl">Hint <FontAwesomeIcon icon={faLightbulb} /></h2>
        <p className="text-xs">Provide a hint to the unlock keys.</p>
      </div>
      <textarea
        className="p-1 w-4/5"
        placeholder={`Hint goes here`}
        value={hint}
        onChange={handleHintChange}
      />
      <hr className="p-2 m-2" />
      <ConnectedComponent>
        <button
          className="btn-primary"
          onClick={amount > 0 && allowance < amount ? approveTokenClick : createCacheOnSubmit}>
          {amount > 0 && allowance < amount ? "Approve Token" : "Create Stash"}
        </button>
      </ConnectedComponent>
    </form>
  )
}

export default CreateStashForm;