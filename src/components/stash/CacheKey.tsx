import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CacheKey = ({ index, cacheKey, handleKeyChange }) => {

  return (
    <>
      <FontAwesomeIcon icon={"key"} size="lg" />
      <input
        type="text"
        placeholder={`Key Part #${index + 1}`}
        value={cacheKey}
        onChange={e => handleKeyChange(index, e)}
      />
    </>
  )
}

export default CacheKey