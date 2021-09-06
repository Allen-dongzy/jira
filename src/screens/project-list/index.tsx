import { SearchPanel } from './search-panel'
import { List } from './list'
import { useState } from 'react'
import { useDebounce } from '../../utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from '../../utils/project'
import { useUsers } from '../../utils/user'

// projects接口
export interface Project {
  id: number
  name: string
  personId: number | string
  pin: boolean
  organization: string
  created: number
}

// users接口
export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

export const ProjectListScreen = () => {
  // 要请求的参数
  const [params, setParam] = useState({
    name: '',
    personId: '',
  })
  // 要请求的参数-防抖处理
  const debounceParams = useDebounce(params)
  // 获取users
  const { data: users } = useUsers()
  // 获取projects
  const { isLoading, error, data: projects } = useProjects(debounceParams)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        users={users || []}
        dataSource={projects || []}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
