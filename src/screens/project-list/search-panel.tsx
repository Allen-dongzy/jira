import { User } from './index'
import { Input, Select } from 'antd'

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
    <form>
      <div>
        <Input
          type="text"
          value={params.name}
          onChange={(e) =>
            setParam({
              ...params,
              name: e.target.value,
            })
          }
        />
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
      </div>
    </form>
  )
}
