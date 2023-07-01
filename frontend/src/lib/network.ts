/* eslint-disable promise/no-promise-in-callback */

import axios, { type Canceler } from 'axios'
import AxiosRetry from 'axios-retry'
// eslint-disable-next-line import/named
import { MD5 } from 'crypto-js'
import { useStorage } from '@sky-fly/vhooks'
import { SERVER_HOST } from '@/config'

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

const requests = new Map<string, Canceler | null>()

instance.interceptors.request.use(
  (config) => {
    if (token.value !== null) {
      config.headers.Authorization = `Bearer ${token.value}`
    }

    const { method, url, params, data } = config
    const key = MD5([method, url, JSON.stringify(params), JSON.stringify(data)].join('&')).toString()
    // @ts-expect-error error
    if (config.cancelRepeat === 'before') {
      requests.get(key)?.()
      requests.delete(key)
      config.cancelToken = new axios.CancelToken((cancel) => {
        requests.set(key, cancel)
      })
    }
    // @ts-expect-error error
    if (config.cancelRepeat === 'after') {
      if (requests.has(key)) {
        config.cancelToken = new axios.CancelToken((cancel) => {
          cancel()
        })
      }
      requests.set(key, null)
    }

    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => {
    const { method, url, params, data } = response.config
    const key = MD5([method, url, JSON.stringify(params), JSON.stringify(data)].join('&')).toString()
    requests.get(key)?.()
    requests.delete(key)

    return response.data
  },
  (error) => {
    const { method, url, params, data } = error.config
    const key = MD5([method, url, JSON.stringify(params), JSON.stringify(data)].join('&')).toString()
    requests.get(key)?.()
    requests.delete(key)

    return axios.isCancel(error) ? undefined : Promise.reject(error)
  }
)

export default instance
