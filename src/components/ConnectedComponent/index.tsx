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
                <button className="px-4 py-1 text-sm font-semibold rounded-full border border-purple-200 text-white bg-purple-600 hover:bg-purple-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
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