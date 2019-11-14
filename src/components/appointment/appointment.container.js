import React, { Component } from 'react'
import Table from './appointment.view'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AppointmentContainer extends Component {
  render() {
    const { count, limit, data, error } = this.props

    return (
      <div>
        {error && error.message}
        <Table
          paging={{ count, limit, data }}
          onChangePage={(page, status) => {
            this.props.loadAppointments({ page, status })
          }}
          onActionClick={(status, id) => {
            console.log('onActionClick', status, id)
            this.props.updateStatus({ id, status })
          }}
        />
      </div>
    )
  }

  componentDidMount() {
    this.props.loadAppointments({ page: 0, status: [] })
  }
}

AppointmentContainer.propTypes = {
  count: PropTypes.number,
  limit: PropTypes.number,
  data: PropTypes.array,
  loadAppointments: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
  error: PropTypes.any
}

const mapState = state => ({
  count: state.appointment.count,
  limit: state.appointment.limit,
  data: state.appointment.data
})

const mapDispatch = ({ appointment: { loadAppointments, updateStatus } }) => ({
  loadAppointments: loadAppointments,
  updateStatus: updateStatus
})

export default connect(
  mapState,
  mapDispatch
)(AppointmentContainer)
