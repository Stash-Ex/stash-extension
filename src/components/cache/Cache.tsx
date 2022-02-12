import React, { useMemo } from "react"
import CacheHint from "./CacheHint";

import ClaimCacheForm from '../forms/ClaimCacheForm';
import { number, shortString, uint256 } from "starknet";

const Cache = (data) => {

  const claimCache = unlockKeys => {
    console.log(`Claiming Cache: ${unlockKeys}`)
  }

  return (
    <div className="cache">
      {/* <h3>Cache #{data.id}</h3> */}
      <p style={{ wordBreak: "break-word" }}>{JSON.stringify(data)}</p>
    </div>
  )
}

export default Cache;