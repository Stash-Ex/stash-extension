import React from "react"

import ClaimStashForm from '../forms/ClaimStashForm';
import { CacheState } from "../../store/metacacheSlice";
import { useTokenInfo } from "../../web3/hooks";
import { VoyagerLink } from "../VoyagerLink";

import { fromNativeTokenAmount } from "../../web3/starknet/utils";

const Stash = ({ cache }: { cache: CacheState }) => {
  const { decimals, address, symbol } = useTokenInfo(cache.token);

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-bold">Stash #{cache.id}</h3>
      <p>Prize: {decimals && fromNativeTokenAmount(cache.amount, decimals)} {
        address && symbol && (
          <VoyagerLink.Contract
            contract={address}
            text={symbol}
          />
        )}
      </p>
      <p>Hint: {cache.hint}</p>
      <p>Owner: <VoyagerLink.Contract contract={cache.owner} /></p>
      {cache.claimed ? "Claimed" : <ClaimStashForm cacheInfo={cache} />}
    </div>
  )
}

export default Stash;