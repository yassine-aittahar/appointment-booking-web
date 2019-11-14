import React, { Component } from 'react'
import TimeSlotsView from './TabPanel.view'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class TimeSlot extends Component {
  render() {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    const { timeslots } = this.props

    return (
      this.props.loaded && (
        <TimeSlotsView
          tabs={days}
          chips={timeslots ? timeslots : []}
          onChange={data => {
            if (!data) return
            let newTimeSlots = []
            if (timeslots) {
              timeslots.forEach((value, index) => {
                if (data.day !== value.day) {
                  newTimeSlots.push(value)
                }
              })
            }
            newTimeSlots.push(data)
            this.props.updateTimeSlots(newTimeSlots)
          }}
        />
      )
    )
  }

  componentDidMount() {
    this.props.getUser()
  }
}

TimeSlot.propTypes = {
  updateTimeSlots: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,

  timeslots: PropTypes.array,
  loaded: PropTypes.bool.isRequired
}

const mapDispatch = ({ user: { updateTimeSlots, loadUser } }) => ({
  updateTimeSlots: updateTimeSlots,
  getUser: loadUser
})

const mapState = ({ user }) => ({
  timeslots: user.timeslots,
  loaded: user.loaded
})

export default connect(
  mapState,
  mapDispatch
)(TimeSlot)
