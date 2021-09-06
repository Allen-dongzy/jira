import { useAsync } from './use-async'
import { useEffect } from 'react'
import { cleanObject } from './index'
import { Project } from '../screens/project-list'
import { useHttp } from './http'

export const useProjects = (params?: Partial<Project>) => {
  // 获取http请求hook
  const client = useHttp()
  // 获取projects请求流程的hook
  const { run, ...result } = useAsync<Project[]>()

  // 监听依赖
  useEffect(() => {
    // 请求projects并处理流程
    run(client('projects', { data: cleanObject(params || {}) }))
    // eslint-disable-next-line
  }, [params])

  return result
}
