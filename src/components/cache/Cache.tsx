import React from "react"
import CacheHint from "./CacheHint";

import ClaimCacheForm from '../forms/ClaimCacheForm';
import { CacheState } from "../../web3/siteCachesSlice";
import { number, shortString, uint256 } from "starknet";

const Cache = ({ cache }: { cache: CacheState }) => {

  const claimCache = unlockKeys => {
    console.log(`Claiming Cache: ${unlockKeys}`)
  }

  return (
    <div className="cache">
      <h3>ID: {cache.id}</h3>
      <h4>Prize: {uint256.uint256ToBN(cache.amount).toString()} {cache.token}</h4>
      <h4>Key: {cache.key}</h4>
      <h4>Hint: {shortString.decodeShortString(cache.hint)}</h4>
      <h4>Owner: {cache.owner}</h4>
      <h4>Claimed: {number.hexToDecimalString(cache.claimed)}</h4>
      {/* <ClaimCacheForm claimCache={claimCache} /> */}
    </div>
  )
}

export default Cache;