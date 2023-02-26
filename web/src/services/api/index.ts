import { appSettings } from '@/config/appSettings'
import { AUTH_KEY } from '@/context/auth'
import { Auth } from '@/context/auth/types'
import axios from 'axios'

function getStorage <T>(key: string) {
  const tokenStorage = localStorage.getItem(key)

  return tokenStorage ? (JSON.parse(tokenStorage) as T) : null
}

export const api = axios.create({
  baseURL: appSettings.backend_url
})

api.interceptors.request.use(async config => {
  const storage = getStorage<Auth>(AUTH_KEY)

  if (storage) {
    config.headers.Authorization = `Bearer ${storage.access_token}`
  }

  return config
}, error => Promise.reject(error))