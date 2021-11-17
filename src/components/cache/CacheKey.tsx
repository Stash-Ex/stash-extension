import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'

const CacheKey = ({index, cacheKey, handleKeyChange}) => {

  return (
      <>
        <FontAwesomeIcon 
            icon={faKey}
            size="lg"
        />
        <input
          type="text"
          placeholder={`Key Part #${index+1}`}
          value={cacheKey}
          onChange={e => handleKeyChange(index, e)}
        />
      </>
  )
}

export default CacheKey