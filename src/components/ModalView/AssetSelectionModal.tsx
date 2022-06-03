import { useState } from "react";
import { TokenInfo, useTokenInfo } from "../../web3/hooks";
import Modal from "./Modal";

export default function AssetSelectionModal({ isOpen, closeModal, onSubmit }) {

    const isValidToken = (token: TokenInfo) => token.address && token.name && token.symbol && token.decimals


    const [tokenAddress, setTokenAddress] = useState(""); // 0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10
    const token = useTokenInfo(tokenAddress);

    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            action={
                <button
                    className="px-4 py-1 mt-2 text-sm font-semibold rounded-full border border-red-200 text-white bg-red-600 hover:bg-red-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                    onClick={isValidToken(token) ? () => { onSubmit(token.address); closeModal(); } : closeModal}
                >
                    {isValidToken(token) ? "Add Token" : "Close"}
                </button>}
            title="Search for a token"
        >
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
        </Modal>
    )
}