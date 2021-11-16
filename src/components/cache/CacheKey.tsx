import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const CacheKey = ({index, cacheKey, handleKeyChange, deleteKey}) => {

  return (
    <div key={index} >
      <input
        type="text"
        placeholder={`Key Part #${index+1}`}
        value={cacheKey}
        onChange={e => handleKeyChange(index, e)}
      />
      <FontAwesomeIcon 
          icon={faMinusCircle}
          onClick={() => deleteKey(index)}
          size="lg"
      />
    </div>
  )
}

export default CacheKey