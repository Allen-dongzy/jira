import { Project, User } from './index'
import { Table } from 'antd'

interface ListProps {
  projects: Project[]
  users: User[]
}
export const List = ({ projects, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          },
        },
      ]}
      dataSource={projects}
    />
  )
}
