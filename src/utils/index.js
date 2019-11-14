import { getToken } from './Storage'

export const isAuthenticated = async () => {
  try {
    const tokenData = await getToken()
    if (tokenData !== null && isAccessTokenValid(tokenData)) {
      return true
    }

    return false
  } catch (e) {
    console.log(e)
    return false
  }
}

/**
 * Determines token validity based on expiry time
 */
export const isAccessTokenValid = tokenData => {
  if (tokenData !== null) {
    if (
      tokenData.timeStamp + parseInt(tokenData.id_token_expires_in) - 60 * 5 >
      Date.now()
    ) {
      return true
    } else {
      console.log(
        'token expired aquired : UTC' +
          tokenData.timeStamp +
          ' now : UTC' +
          Date.now() +
          ' validity : ' +
          tokenData.id_token_expires_in
      )
      return false
    }
  } else {
    return false
  }
}

export const parseJwt = token => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}
