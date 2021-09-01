import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from '../../utils'
import { useHttp } from '../../utils/http'

const apiUrl = process.env.REACT_APP_API_URL

export interface Project {
  id: number
  name: string
  personId: number
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
    <div>
      <SearchPanel params={params} setParam={setParam} users={users} />
      <List projects={projects} users={users} />
    </div>
  )
}
