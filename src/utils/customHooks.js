import { useState, useEffect } from 'react'

const useInput = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)

  function valueChangeHandler (event) {
    setValue(event.target.value)
  }

  function valueResetHandler () {
    setValue('')
  }

  return [value, valueChangeHandler, valueResetHandler]
}

export { useInput }
