/* eslint-disable promise/no-promise-in-callback */

import axios from 'axios'
import { useStorage } from 'shooks'
import { SERVER_HOST } from '@/config'
import AxiosRetry from 'axios-retry'

const token = useStorage<string>('token', {
  prefix: 'sky-admin-0.0.0',
})

const instance = axios.create({
  baseURL: SERVER_HOST,
  timeout: 10 * 1000,
  withCredentials: true,
})

AxiosRetry(instance, {
  retries: 3,
  shouldResetTimeout: true,
  retryDelay: (retryCount) => retryCount * 250,
  retryCondition: (error) => error.message.includes('timeout'),
})

const CancelToken = axios.CancelToken

instance.interceptors.request.use(
  (config) => {
    if (config.headers['Content-Type'] === null) {
      config.headers['Content-Type'] = 'application/json'
    }
    if (token.value !== null) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (result) => result.data,
  (error) => Promise.reject(error)
)

export default instance
