import { assureTokenResponse, login } from '../utils/Api'
import { removeToken } from '../utils/Storage'

const auth = {
  state: {
    token: null,
    user: null,
    loaded: false,
    error: ''
  }, // initial state
  reducers: {
    setToken(state, token) {
      console.log(' setToken', token)

      return {
        ...state,
        token,
        loaded: true
      }
    },
    setError(state, payload) {
      console.log(' setError', payload)
      return { ...state, error: payload }
    }
  },
  effects: dispatch => ({
    async loadToken(payload, rootState) {
      try {
        const token = await assureTokenResponse()
        console.log('load token', token)

        if (token) {
          dispatch.auth.setToken(token.id_token)
          return token
        } else {
          dispatch.auth.setToken(null)
          dispatch.user.clear()
          return null
        }
      } catch (e) {
        console.log('load error', e)
        dispatch.auth.setError(e)
      }
    },
    async login(payload, rootState) {
      login(payload)
        .then(res => {
          dispatch.auth.setToken(res.id_token)
        })
        .catch(e => {
          dispatch.auth.setError(e)
        })
    },

    async logout(payload, rootState) {
      // remove token from local storage
      removeToken()
      dispatch.auth.setToken(null)
      dispatch.user.clear()
    }
  })
}

export default auth
