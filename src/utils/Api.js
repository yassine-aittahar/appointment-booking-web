import config from '../config'
import { Keys } from './Types'
import { getToken, setToken } from './Storage'
import { isAccessTokenValid } from './index'

const getBaseUrl = () => {
  return config.api.baseUrl
}

const baseDeviceRequest = async (method, path, data = {}) => {
  console.info(`API 2 > ${method} ${path}`)
  const token = await assureAccessToken()
  return timeout(
    60000,
    fetch(`${getBaseUrl()}/api/v1${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: method === 'get' ? null : JSON.stringify(data)
    })
      .catch(handleNetWorkError) // handle network issues
      .then(checkStatus)
      .then(parseJSON)
      .catch(error => {
        throw error
      }),
    path
  )
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  switch (response.status) {
    case 404:
      return Promise.reject(new Error(Keys.ERRORS.NOT_FOUND_ERROR))
    case 401:
      return Promise.reject(new Error(Keys.ERRORS.UNAUTHORIZED_ERROR))
    case 403:
      return Promise.reject(new Error(Keys.ERRORS.FORBIDDEN_ERROR))
    default:
      return Promise.reject(response)
  }
}

const parseJSON = response => {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.text().then(text => {
    try {
      return JSON.parse(text.trim())
    } catch (error) {
      return text
    }
  })
}

const handleNetWorkError = error => {
  console.log(error)
  throw new Error(Keys.ERRORS.NETWORK_ERROR)
}

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    const timeOut = setTimeout(function() {
      reject(new Error(Keys.ERRORS.TIME_OUT_ERROR))
    }, ms)
    promise.then(resolve, reject).finally(() => {
      clearTimeout(timeOut)
    })
  })
}

const get = path => baseDeviceRequest('get', path)
const patch = (path, data) => baseDeviceRequest('PATCH', path, data)

export const login = async payload => {
  return timeout(
    60000,
    fetch(`${getBaseUrl()}/auth`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .catch(handleNetWorkError)
      .then(checkStatus)
      .then(parseJSON)
      .catch(error => {
        throw error
      })
  ).then(res => {
    setToken(res)
    return res
  })
}

export const assureAccessToken = () => {
  const auth = getToken()
  if (isAccessTokenValid(auth)) {
    return auth.id_token
  }
  return null
}

/**
 * Upon success resolves with a valid access_token,
 */
export const assureTokenResponse = () => {
  const auth = getToken()
  if (isAccessTokenValid(auth)) {
    return auth
  }
  return null
}
/*
 get Appointments filtred by status
 @param status 'pending', 'accepted','rejected'
 @param limit rows per page
 @param offset start from 
 */
export const getAppointments = async (status = [], limit = 100, offset = 0) => {
  let path = '/appointments'
  if (status) {
    path += '?'
    status.forEach(filter => {
      path += `status=${filter}&`
    })
  }

  if (path.indexOf('?') === -1) {
    path += '?'
  }

  path += `limit=${limit}&offset=${offset}`

  return get(path)
}

export const updateTimeSlots = timeslots => {
  return patch('/sellers', { timeslots })
}

export const getUser = id => {
  return get(`/sellers/${id}`)
}

export const updateAppointment = (id, status) => {
  return patch(`/appointments/${id}`, { status })
}
