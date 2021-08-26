// 判断是否为false
export const isFlasy = (value) => (value === 0 ? false : !value);

// 清空对象中无效的属性
export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => isFlasy(obj[key]) && delete result[key]);
  return result;
};
