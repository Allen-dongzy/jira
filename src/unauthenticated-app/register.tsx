import { FormEvent } from 'react'
import { useAuth } from '../context/auth-context'
import { Button, Form, Input } from 'antd'

export const RegisterScreen = () => {
  const { register } = useAuth()

  // 表单提交
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input type="text" id={'username'} placeholder={'请输入用户名'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input type="password" id={'password'} placeholder={'请输入密码'} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={'submit'} type={'primary'}>
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}
