import React, { useMemo } from "react"
import CacheHint from "./CacheHint";

import ClaimCacheForm from '../forms/ClaimCacheForm';
import { CacheState } from "../../store/metacacheSlice";

const Cache = ({ cache }: { cache: CacheState }) => {

  return (
    <div className="cache">
      {/* <h3>Cache #{data.id}</h3> */}
      <p style={{ wordBreak: "break-word" }}>cache data: {JSON.stringify(cache)}</p>
    </div>
  )
}

export default Cache;