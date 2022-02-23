import React from "react"

import ClaimCacheForm from '../forms/ClaimCacheForm';
import { CacheState } from "../../store/metacacheSlice";
import { useTokenInfo } from "../../web3/hooks";
import { VoyagerLink } from "../VoyagerLink";

import './Cache.css'
import { fromNativeTokenAmount } from "../../web3/starknet/utils";

const Cache = ({ cache }: { cache: CacheState }) => {
  const { decimals, address, symbol } = useTokenInfo(cache.token);

  return (
    <div className="cache">
      <h3>Cache #{cache.id}</h3>
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
      {cache.claimed ? "Claimed" : <ClaimCacheForm cacheInfo={cache} />}
    </div>
  )
}

export default Cache;