import { useState, useEffect } from 'react'

const useDebounce = (value: any, delay: number = 300) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceValue(value)
    })

    return () => {
      clearTimeout(handle)
    }
  }, [value, delay])

  return debounceValue
}

export default useDebounce
