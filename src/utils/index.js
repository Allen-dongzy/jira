// 判断是否为false
import { useEffect, useState } from "react";

export const isFlasy = (value) => (value === 0 ? false : !value);

// 清空对象中无效的属性
export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => isFlasy(obj[key]) && delete result[key]);
  return result;
};

// 自定义hook-执行一次的useEffect
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

// 自定义hook-防抖
export const useDebounce = (value, delay = 1000) => {
  // 定义debounceValue，值为value
  const [debounceValue, setDebounceValue] = useState(value);
  //使用useEffect监听value和delay
  useEffect(() => {
    // 每次value或delay变化后都设置一个定时器
    const timer = setTimeout(() => {
      // 若是顺利延时则设置debounceValue为最新的value
      setDebounceValue(value);
    }, delay);
    // 清理上一个useEffect中的timer
    return () => clearTimeout(timer);
  }, [value, delay]);
  //返回debounceValue(最新的value)
  return debounceValue;
};
