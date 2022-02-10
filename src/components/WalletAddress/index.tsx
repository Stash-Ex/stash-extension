import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStarknet } from '../../web3/starknetSlice';
import { RootState } from "../../store";

const WalletAddress = () => {

    const { account, loading } = useSelector((state: RootState) => state.starknet);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStarknet(false))
    }, [dispatch, account]);

    if (!account) {
        return (
            <div>
                <p>Please connect wallet</p>
                <button
                    onClick={() => dispatch(getStarknet(true))}
                >
                    Connect Wallet
                </button>
            </div>
        );
    }
    return <p>{account}</p>
}

export default WalletAddress