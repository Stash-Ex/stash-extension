import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStarknet } from '../../store/starknetSlice';
import { AppState } from "../../store";

const ConnectedComponent = ({ children }) => {

    const { account } = useSelector((state: AppState) => state.starknet);
    const dispatch = useDispatch();

    if (!account) {
        return (
            <div>
                <button className="btn-primary"
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