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
                    className="btn-primary"
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