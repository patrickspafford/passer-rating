import { useState, useEffect, Dispatch, SetStateAction } from 'react'
const { parse, stringify } = JSON


export default function useLocalStorage<T, V>(key: T, initialValue: V) {
    const [value, setValue]: [V, Dispatch<SetStateAction<V>>] = useState<V>(() => {
      const keyString = key as unknown as string
      const jsonValue = localStorage.getItem(keyString)
      if (jsonValue != null) {
        return parse(jsonValue) as V
      }
      return (initialValue as V)
    })
  
    useEffect(() => {
      localStorage.setItem((key as unknown as string), stringify(value))
    }, [key, value])

    return [value, setValue] as const
  }