import { BigNumberish } from "ethers"
import { useEffect, useMemo, useState } from "react"
import { Contract, uint256 } from "starknet"
import { toBN } from "starknet/dist/utils/number"
import { useAppSelector } from "../store/hooks"
import { tokenInvokeRequest } from "../walletProxy/events"
import * as ERC20 from "./starknet/erc20.service"
import { doesContractExist, fromNativeTokenAmount, isValidAddress } from "./starknet/utils"

export interface TokenInfo {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
}

export const useTokenContract = (address: string) => {
    const provider = useAppSelector(({ starknet: { provider } }) => provider)
    const [contract, setContract] = useState(undefined);

    useMemo(() => {
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
    }, [address, contract])

    return { address, name, symbol, decimals }
}

export const useAllowance = (tokenInfo: TokenInfo, owner: string, spender: string): BigNumberish => {
    const [allowance, setAllowance] = useState(0);
    const contract = useTokenContract(tokenInfo?.address);
    const blockHash = useAppSelector(state => state.starknet.blockHash);

    useEffect(() => {
        if (isValidAddress(owner) && isValidAddress(spender) && contract) {
            ERC20.allowance(contract, owner, spender).then(res => {
                try {
                    console.log("got allowance: " + res)
                    const allowance = fromNativeTokenAmount(res, tokenInfo.decimals);
                    setAllowance(allowance)
                } catch (e) {
                    console.log("Error usingAllowance" + e)
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
    const contract: Contract = useTokenContract(tokenAddress);

    useEffect(() => {
        if (contract) {
            const invokeContract = (spender: string, amount: BigNumberish) => {
                const args = { spender, ...uint256.bnToUint256(toBN(amount)) };
                tokenInvokeRequest(contract.connectedTo, "approve", args).then(transaction => {
                    console.log("Invoked Contract: " + JSON.stringify(transaction));
                    setAddTransactionResponse(transaction)
                }).catch(e => console.log("Error invoking token approve: " + e))
            }
            setInvokeTokenApprove(() => invokeContract)
        }
    }, [contract, tokenAddress])

    return { addTransactionResponse, invokeTokenApprove };
}