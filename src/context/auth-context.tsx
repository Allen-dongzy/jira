import React, { ReactNode, useContext, useState } from 'react'
import * as auth from 'auth-provider'
import { AuthForm } from 'auth-provider'
import { User } from '../screens/project-list'
import { http } from '../utils/http'
import { useMount } from '../utils'

export interface ContextType {
  user: User | null
  login: (form: AuthForm) => Promise<void>
  register: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

// 初始化user
const bootstrapUser = async () => {
  const token = auth.getToken()
  if (!token) return null
  const data = await http('me', { token })
  return data.user
}

// 设置全局context
const AuthContext = React.createContext<ContextType | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    bootstrapUser().then(setUser)
  })

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth必须在AuthProvider中使用')
  return context
}
