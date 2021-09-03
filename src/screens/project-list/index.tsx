import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from '../../utils'
import { useHttp } from '../../utils/http'
import styled from '@emotion/styled'

export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

export const ProjectListScreen = () => {
  const [params, setParam] = useState({
    name: '',
    personId: '',
  })
  const debounceParams = useDebounce(params)
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debounceParams) }).then(setProjects)
  }, [debounceParams])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParam={setParam} users={users} />
      <List projects={projects} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
