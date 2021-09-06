import React from 'react'

type PropsError = { error: Error | null }

type FallbackRender = (props: PropsError) => React.ReactElement

// 现成的插件: http://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  PropsError
> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }

  // 当子组件抛出异常, 这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { children, fallbackRender } = this.props
    if (error) return fallbackRender({ error })
    return children
  }
}
