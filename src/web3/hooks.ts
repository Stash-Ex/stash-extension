import { BigNumberish } from "ethers"
import { useEffect, useMemo, useState } from "react"
import { useAppSelector } from "../store/hooks"
import * as ERC20 from "./starknet/erc20.service"
import { isValidAddress } from "./starknet/utils"

export interface Token {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
}

export const useContract = (address: string) => {
    const provider = useAppSelector(({ starknet: { provider } }) => provider)
    const [contract, setContract] = useState(undefined);

    useMemo(() => {
        if (isValidAddress(address)) {
            setContract(ERC20.createERC20Contract(address, provider))
        }
    }, [address, provider]);

    return contract;
}

export const useToken = (address: string): Token => {
    const [name, setName] = useState(undefined);
    const [symbol, setSymbol] = useState(undefined);
    const [decimals, setDecimals] = useState(undefined);

    const contract = useContract(address);

    useEffect(() => {
        if (contract) {
            ERC20.name(contract).then(res => setName(res));
            ERC20.symbol(contract).then(res => setSymbol(res));
            ERC20.decimals(contract).then(res => setDecimals(res));
        }
    }, [contract])

    return { address, name, symbol, decimals }
}

export const useAllowance = (tokenAddress: string, owner: string, spender: string): BigNumberish => {
    const [allowance, setAllowance] = useState(0);
    const contract = useContract(tokenAddress);

    useEffect(() => {
        if (contract) {
            ERC20.allowance(contract, owner, spender).then(res => setAllowance(res))
        }
    }, [contract, owner, spender]);

    return allowance;
}