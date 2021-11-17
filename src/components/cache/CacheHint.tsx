import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

const CacheHint = ({index, cacheHint, handleHintChange = null}) => {

  return (
    <>
      <FontAwesomeIcon 
          icon={faLightbulb}
          size="lg"
      />
      { handleHintChange != null ?
          <input
            type="text"
            placeholder={`Hint #${index+1}`}
            value={cacheHint}
            onChange={e => handleHintChange(index, e)}
          />
          :
          <p className="hint-text" style={{display: 'inline'}}>{cacheHint}</p>
      }
    </>
  )
}

export default CacheHint