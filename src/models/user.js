import { getUser, updateTimeSlots } from '../utils/Api'
import { parseJwt } from '../utils'

const timeslotsInit = [
  {
    day: 0,
    slots: []
  },
  {
    day: 1,
    slots: []
  },
  {
    day: 2,
    slots: []
  },
  {
    day: 3,
    slots: []
  },
  {
    day: 4,
    slots: []
  },
  {
    day: 5,
    slots: []
  },
  {
    day: 6,
    slots: []
  }
]

const initState = {
  loaded: false,
  timeslots: timeslotsInit
}

const user = {
  state: initState, // initial state
  reducers: {
    setUser(state, payload) {
      console.log('set user => ', payload)
      const { id, email, name, timeslots } = payload
      return { ...state, id, email, name, timeslots, loaded: true }
      /*
      if (timeslots) return { ...state, id, email, name, timeslots }
      else return { ...state, id, email, name, timeslots: timeslotsInit }
      */
    },
    clear(state, payload) {
      return initState
    },
    setError(state, payload) {
      console.log('user setError => ', payload)

      return { ...state, error: payload }
    }
  },
  effects: dispatch => ({
    updateTimeSlots(payload, rootState) {
      console.log('updateTimeSlots =>', payload)

      return updateTimeSlots(payload)
        .then(res => {
          console.log('updateTimeSlots res =>', res)
          dispatch.user.setUser(res.data)
        })
        .catch(e => {
          console.log('updateAppointment error', e)
          dispatch.appointment.setError(e)
        })
    },
    loadUser(payload, rootState) {
      console.log('loadUser root state => ', rootState)
      return getUser(parseJwt(rootState.auth.token).id)
        .then(res => {
          console.log('getUser => ', res)

          const { _id, email, name, timeslots } = res.data

          dispatch.user.setUser({ id: _id, email, name, timeslots })
          return res
        })
        .catch(e => {
          console.log('loadUser error', e)
          dispatch.user.setError(e)
          return
        })
    }
  })
}

export default user
