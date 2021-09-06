import { User } from './screens/project-list'

// 缓存中token对应的key
const localStorageKey = '__auth_provider_token__'

// api路径
const apiUrl = process.env.REACT_APP_API_URL

// 获取token
export const getToken = () => window.localStorage.getItem(localStorageKey)

export interface AuthForm {
  username: string
  password: string
}

// 处理user对象，存入缓存
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

// 登录
export const login = (data: AuthForm) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const data = await res.json()
    if (res.ok) return handleUserResponse(data)
    else return Promise.reject(data)
  })
}

// 注册
export const register = (data: AuthForm) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const data = await res.json()
    if (res.ok) return handleUserResponse(data)
    else return Promise.reject(data)
  })
}

// 注销
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
