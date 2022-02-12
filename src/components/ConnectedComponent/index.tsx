import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStarknet } from '../../web3/starknetSlice';
import { RootState } from "../../store";

const ConnectedComponent = ({ children }) => {

    const { account } = useSelector((state: RootState) => state.starknet);
    const dispatch = useDispatch();

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
    return <React.Fragment>{children}</React.Fragment>;
}

export default ConnectedComponent