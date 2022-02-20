import { Contract, shortString, ProviderInterface, Abi } from "starknet"
import { BigNumberish, toBN } from "starknet/dist/utils/number"
import { bnToUint256, uint256ToBN } from "starknet/dist/utils/uint256";

import ERC20 from "../abi/ERC20.json";


export const createERC20Contract = (address: string, provider: ProviderInterface) =>
    new Contract(ERC20 as Abi[], address, provider);

export const name = async (contract: Contract): Promise<string> => {
    const res = await contract.call("name");
    return shortString.decodeShortString(res.name as string);
}

export const symbol = async (contract: Contract): Promise<string> => {
    const res = await contract.call("symbol");
    return shortString.decodeShortString(res.symbol as string);
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
    const res = await contract.call("balanceOf", { account })
    return uint256ToBN(res.balance as any);
}

export const allowance = async (contract: Contract, owner: string, spender: string): Promise<BigNumberish> => {
    const res = await contract.call("allowance", { owner, spender })
    return uint256ToBN(res.remaining as any);
}

export const transfer = async (contract: Contract, recipient: string, amount: BigNumberish): Promise<boolean> => {
    const { low, high } = bnToUint256(amount);
    const res = await contract.call("transfer", { recipient, low, high });
    return toBN(res.success).toNumber() > 0;
}

export const transferFrom = async (
    contract: Contract,
    sender: string,
    recipient: string,
    amount: BigNumberish
): Promise<any> => {
    const { low, high } = bnToUint256(amount);
    const res = await contract.call("transferFrom", { sender, recipient, low, high });
    return toBN(res.success).toNumber() > 0;
}

export const approve = async (contract: Contract, spender: string, amount: BigNumberish): Promise<boolean> => {
    const { low, high } = bnToUint256(amount);
    const res = await contract.call("approve", { spender, low, high });
    return toBN(res.success).toNumber() > 0;
}

export const increaseAllowance = async (contract: Contract, spender: string, amount: BigNumberish): Promise<boolean> => {
    const { low, high } = bnToUint256(amount);
    const res = await contract.call("increaseAllowance", { spender, low, high });
    return toBN(res.success).toNumber() > 0;
}

export const decreaseAllowance = async (contract: Contract, spender: string, amount: BigNumberish): Promise<boolean> => {
    const { low, high } = bnToUint256(amount);
    const res = await contract.call("decreaseAllowance", { spender, low, high });
    return toBN(res.success).toNumber() > 0;
}


// { "code": "TRANSACTION_RECEIVED", "address": "0x01fe1800f9d08e18cb1c321e33461fbed6ccfa769fc6957d3d611ba86da17d43", "transaction_hash": "0x1fc41709ea977884265c88c3dfea75007e40e841b596ffbf09a34402f932b3e" }