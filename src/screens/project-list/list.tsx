import { Project, User } from './index'
import { Table } from 'antd'
import dayjs from 'dayjs'

interface ListProps {
  projects: Project[]
  users: User[]
}

export const List = ({ projects, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      rowKey={(record) => record.id}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '负责人',
          key: '1',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '创建时间',
          key: '1',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          },
        },
      ]}
      dataSource={projects}
    />
  )
}
