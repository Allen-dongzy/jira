import { User } from '../screens/project-list'
import { useHttp } from './http'
import { useAsync } from './use-async'
import { useEffect } from 'react'
import { cleanObject } from './index'

export const useUsers = (params?: Partial<User>) => {
  // 获取http请求hook
  const client = useHttp()
  // 获取users请求流程的hook
  const { run, ...result } = useAsync<User[]>()

  // 监听依赖
  useEffect(() => {
    // 请求users并处理流程
    run(client('users', { data: cleanObject(params || {}) }))
    // eslint-disable-next-line
  }, [params])

  return result
}
