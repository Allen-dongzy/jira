import { useState } from 'react'
import { RegisterScreen } from './register'
import { LoginScreen } from './login'
import { Button, Card, Divider, Typography } from 'antd'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  return (
    <Container>
      <Header />
      <Background />
      <Button
        onClick={() => {
          throw new Error('点击抛出一个异常')
        }}
      >
        抛出异常
      </Button>
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        {error ? (
          <TypographyText type={'danger'}>{error.message}</TypographyText>
        ) : null}
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <Button type={'link'} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '已经有账号？直接登录' : '没有账号？注册新账号'}
        </Button>
      </ShadowCard>
    </Container>
  )
}

const TypographyText = styled(Typography.Text)`
  display: block;
  margin-bottom: 10px;
`

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 10rem),
    calc(((100vw - 40rem) / 2) - 10rem), cover;
  background-image: url(${left}), url(${right});
`

const Header = styled.header`
  background: url(${logo}) no-repeat center/8rem;
  padding: 5rem 0;
  width: 100%;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`
