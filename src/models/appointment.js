import { getAppointments, updateAppointment } from '../utils/Api'

const appointment = {
  state: {
    count: 0,
    limit: 5,
    offset: 0,
    loaded: false,
    error: '',
    data: [],
    status: []
  }, // initial state
  reducers: {
    setPaging(state, { status, offset }) {
      return { ...state, status, offset }
    },
    setData(state, { count, limit, offset, data }) {
      return {
        ...state,
        count,
        limit,
        offset,
        data,
        loaded: true
      }
    },
    setError(state, payload) {
      return { ...state, error: payload }
    }
  },
  effects: dispatch => ({
    async loadAppointments({ page, status }, rootState) {
      console.log('load loadApplointments')

      try {
        const { limit } = rootState.appointment
        const offset = page * limit
        dispatch.appointment.setPaging({ status, offset })
        const res = await getAppointments(status, limit, offset)
        console.log(' loadApplointments', res)

        dispatch.appointment.setData(res)
        return res
      } catch (e) {
        console.log('load error', e)
        dispatch.appointment.setError(e)
      }
    },
    updateStatus({ id, status }, rootState) {
      return updateAppointment(id, status)
        .then(res => {
          const { status } = rootState.appointment

          return dispatch.appointment.loadAppointments({ page: 0, status })
        })
        .catch(e => {
          console.log('updateAppointment error', e)
          dispatch.appointment.setError(e)
        })
    }
  })
}

export default appointment
