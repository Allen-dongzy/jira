import { User } from './index'
import { Form, Input, Select } from 'antd'

interface SearchPanelProps {
  params: {
    name: string
    personId: string
  }
  setParam: (params: SearchPanelProps['params']) => void
  users: User[]
}

export const SearchPanel = ({ params, setParam, users }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          type="text"
          value={params.name}
          placeholder={'请输入项目名'}
          onChange={(e) =>
            setParam({
              ...params,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={params.personId}
          onChange={(value) =>
            setParam({
              ...params,
              personId: value,
            })
          }
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
