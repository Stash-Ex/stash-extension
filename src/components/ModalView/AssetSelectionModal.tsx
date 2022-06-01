import { useState } from "react";
import { TokenInfo, useTokenInfo } from "../../web3/hooks";
import Modal from "./Modal";

export default function AssetSelectionModal({ isOpen, closeModal }) {

    const isValidToken = (token: TokenInfo) => token.address && token.name && token.symbol && token.decimals


    const [tokenAddress, setTokenAddress] = useState(""); // 0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10
    const [amount, setAmount] = useState(0);

    const token = useTokenInfo(tokenAddress);

    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            action={<button disabled={!isValidToken(token)} onClick={closeModal}>Add Token</button>}
            title="Add Asset"
        >
            <form>
                <label className="text" htmlFor="tokenaddress" >Token Address:</label>
                <input
                    type="text"
                    id="tokenaddress"
                    name="tokenaddress"
                    placeholder="Enter token address"
                    value={tokenAddress}
                    onChange={e => setTokenAddress(e.target.value)} />
                <br />
                {
                    isValidToken(token) ?
                        <div>
                            <p>Name: {token?.name}</p>
                            <p>Symbol: {token?.symbol}</p>
                        </div>
                        :
                        <p>Token Not Found!</p>
                }
                <br />
                <label>Token Amount: &#32;</label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    value={amount}
                    onChange={e => setAmount(parseFloat(e.target.value) || 0)} /><br /><br />
            </form>
        </Modal>
    )
}