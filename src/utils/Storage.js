import { Keys } from './Types'

export function setToken(data) {
  if (data) data = JSON.stringify(data)
  localStorage.setItem(Keys.STORAGE.AUTH_RESPONSE, data)
}

export function getToken() {
  let data = localStorage.getItem(Keys.STORAGE.AUTH_RESPONSE)
  if (data) data = JSON.parse(data)
  return data
}

export function removeToken() {
  return localStorage.removeItem(Keys.STORAGE.AUTH_RESPONSE)
}
