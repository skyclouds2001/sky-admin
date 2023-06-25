/* eslint-disable promise/no-promise-in-callback */

import axios from 'axios'
import { useStorage } from 'shooks'
import { SERVER_HOST } from '@/config'

const storage = useStorage<string>('token', {
  prefix: 'sky-admin-0.0.0',
})

const instance = axios.create({
  baseURL: SERVER_HOST,
  timeout: 10000,
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    if (storage.value !== null) {
      config.headers.Authorization = `Bearer ${storage.value}`
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
