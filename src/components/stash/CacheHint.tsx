import React from "react"

const CacheHint = ({ cacheHint, handleHintChange = null }) => {

  return (
    <>
      {handleHintChange != null ?
        <input
          type="text"
          placeholder={`Hint goes here`}
          value={cacheHint}
          onChange={e => handleHintChange(e)}
        />
        :
        <p className="hint-text" style={{ display: 'inline' }}>{cacheHint}</p>
      }
    </>
  )
}

export default CacheHint