import { BigNumberish } from "ethers"
import { useEffect, useState } from "react"
import { uint256 } from "starknet"
import { toBN } from "starknet/dist/utils/number"
import { useAppSelector } from "../store/hooks"
import { tokenInvokeRequest } from "../walletProxy/events"
import * as ERC20 from "./starknet/erc20.service"
import { doesContractExist } from "./starknet/utils"

export interface TokenInfo {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
}

export const useTokenContract = (address: string) => {
    const provider = useAppSelector(({ starknet: { provider } }) => provider)
    const [contract, setContract] = useState(undefined);

    useEffect(() => {
        doesContractExist(address, provider)
            .then(res => res && setContract(ERC20.createERC20Contract(address, provider)))
    }, [address, provider]);

    return contract;
}

export const useTokenInfo = (address: string): TokenInfo => {
    const [name, setName] = useState(undefined);
    const [symbol, setSymbol] = useState(undefined);
    const [decimals, setDecimals] = useState(undefined);

    const contract = useTokenContract(address);

    useEffect(() => {
        if (contract) {
            ERC20.name(contract).then(res => setName(res));
            ERC20.symbol(contract).then(res => setSymbol(res));
            ERC20.decimals(contract).then(res => setDecimals(res));
        }
    }, [contract])

    return { address, name, symbol, decimals }
}

export const useAllowance = (tokenInfo: TokenInfo, owner: string, spender: string): BigNumberish => {
    const [allowance, setAllowance] = useState(0);
    const contract = useTokenContract(tokenInfo?.address);
    const blockHash = useAppSelector(state => state.starknet.blockHash);

    useEffect(() => {
        if (contract) {
            ERC20.allowance(contract, owner, spender).then(res => {
                try {
                    const allowance = toBN(res).div(toBN(tokenInfo.decimals));
                    setAllowance(allowance)
                } catch (e) {
                    setAllowance(0);
                }
            });
        }
    }, [contract, owner, spender, tokenInfo.decimals, blockHash]);

    return allowance;
}

export const useTokenApprove = (tokenAddress) => {
    const [addTransactionResponse, setAddTransactionResponse] = useState(undefined);
    const [invokeTokenApprove, setInvokeTokenApprove] = useState(undefined);
    const contract = useTokenContract(tokenAddress);

    useEffect(() => {
        if (contract) {
            const invokeContract = (tokenInfo: TokenInfo, spender: string, amount: BigNumberish) => {
                const normAmount = uint256.bnToUint256(toBN(amount).mul(toBN(tokenInfo.decimals)))
                const args = { spender, low: normAmount.low, high: normAmount.high };
                try {
                    tokenInvokeRequest(tokenInfo.address, "approve", args).then(transaction => {
                        console.log("Invoked Contract: " + JSON.stringify(transaction));
                        setAddTransactionResponse(transaction)
                    });
                } catch (e) {
                    console.log("Error invoking token approve: " + e)
                }
            }
            setInvokeTokenApprove(() => invokeContract)
        }
    }, [contract, tokenAddress])

    return { addTransactionResponse, invokeTokenApprove };
}