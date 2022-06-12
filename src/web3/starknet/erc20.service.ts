import { Contract, shortString, ProviderInterface, Abi, AddTransactionResponse } from "starknet"
import { BigNumberish, toBN, toHex, toFelt } from "starknet/dist/utils/number"
import { bnToUint256, uint256ToBN } from "starknet/dist/utils/uint256";

import ERC20 from "../abi/ERC20.json";


export const createERC20Contract = (address: string, provider: ProviderInterface) =>
    new Contract(ERC20 as Abi, address, provider);

export const name = async (contract: Contract): Promise<string> => {
    const res = await contract.call("name");
    return shortString.decodeShortString(toHex(res.name));
}

export const symbol = async (contract: Contract): Promise<string> => {
    const res = await contract.call("symbol");
    return shortString.decodeShortString(toHex(res.symbol));
}

export const totalSupply = async (contract: Contract): Promise<BigNumberish> => {
    const res = await contract.call("totalSupply");
    return uint256ToBN(res.totalSupply as any);
}

export const decimals = async (contract: Contract): Promise<BigNumberish> => {
    const res = await contract.call("decimals");
    return toBN(res.decimals);
}

export const balanceOf = async (contract: Contract, account: string): Promise<BigNumberish> => {
    const res = await contract.call("balanceOf", [account])
    return uint256ToBN(res.balance as any);
}

export const allowance = async (contract: Contract, owner: string, spender: string): Promise<BigNumberish> => {
    const res = await contract.call("allowance", [owner, spender])
    return uint256ToBN(res.remaining as any);
}

export const transfer = async (contract: Contract, recipient: string, amount: BigNumberish): Promise<AddTransactionResponse> => {
    const { low, high } = bnToUint256(amount);
    return await contract.invoke("transfer", [recipient, low, high]);
}

export const transferFrom = async (
    contract: Contract,
    sender: string,
    recipient: string,
    amount: BigNumberish
): Promise<AddTransactionResponse> => {
    const { low, high } = bnToUint256(amount);
    return await contract.invoke("transferFrom", [sender, recipient, low, high]);
}

export const approve = async (contract: Contract, spender: string, amount: BigNumberish): Promise<AddTransactionResponse> => {
    const { low, high } = bnToUint256(amount);
    return await contract.invoke("approve", [spender, low, high]);
}

export const increaseAllowance = async (contract: Contract, spender: string, amount: BigNumberish): Promise<AddTransactionResponse> => {
    const { low, high } = bnToUint256(amount);
    return await contract.invoke("increaseAllowance", [spender, low, high]);
}

export const decreaseAllowance = async (contract: Contract, spender: string, amount: BigNumberish): Promise<AddTransactionResponse> => {
    const { low, high } = bnToUint256(amount);
    return await contract.invoke("decreaseAllowance", [spender, low, high]);
}
