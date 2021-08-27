// 判断是否为false
import { useEffect, useState } from "react"

export const isFlasy = (value: unknown): boolean =>
  value === 0 ? false : !value

// 清空对象中无效的属性
export const cleanObject = (obj: object): object => {
  const result = { ...obj }
  // @ts-ignore
  Object.keys(result).forEach((key) => isFlasy(obj[key]) && delete result[key])
  return result
}

// 自定义hook-执行一次的useEffect
export const useMount = (callback: () => void): void => {
  useEffect(() => {
    callback()
  }, [])
}

// 自定义hook-防抖
export const useDebounce = <T>(value: T, delay = 500): T => {
  // 定义debounceValue，值为value
  const [debounceValue, setDebounceValue] = useState(value)
  //使用useEffect监听value和delay
  useEffect(() => {
    // 每次value或delay变化后都设置一个定时器
    const timer = setTimeout(() => {
      // 若是顺利延时则设置debounceValue为最新的value
      setDebounceValue(value)
    }, delay)
    // 清理上一个useEffect中的timer
    return () => clearTimeout(timer)
  }, [value, delay])
  //返回debounceValue(最新的value)
  return debounceValue
}

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    },
  }
}
