import { useState } from 'react'

interface State<D> {
  error: Error | null
  data: D | null
  status: 'idle' | 'loading' | 'success' | 'error'
}

const defaultState: State<null> = {
  status: 'idle',
  data: null,
  error: null,
}

const defaultConfig = {
  throwOnError: false,
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig }

  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  })

  const setData = (data: D) =>
    setState({
      data,
      status: 'success',
      error: null,
    })

  const setError = (error: Error) =>
    setState({
      error,
      status: 'error',
      data: null,
    })

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) throw new Error('请传入promise类型的数据')
    setState({ ...state, status: 'loading' })
    return promise
      .then((data: D) => {
        setData(data)
        return data
      })
      .catch((error: Error) => {
        setError(error)
        if (config.throwOnError) return Promise.reject(error)
        return error
      })
  }

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    setData,
    setError,
    run,
    ...state,
  }
}
