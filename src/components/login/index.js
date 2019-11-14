import React, { Component } from 'react'
import LoginView from './SignInSide'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class LoginComponent extends Component {
  render() {
    return (
      <LoginView
        doLogin={this.onSubmit.bind(this)}
        error={this.props.auth.error}
      />
    )
  }

  onSubmit(email, password) {
    this.props.login({ email, password })
  }
}

LoginComponent.propTypes = {
  login: PropTypes.func,
  auth: PropTypes.shape({
    error: PropTypes.any,
    token: PropTypes.string,
    loaded: PropTypes.bool
  })
}

const mapState = state => ({
  auth: state.auth,
  error: state.auth.error
})

const mapDispatch = ({ auth: { login } }) => {
  return {
    login: payload => login(payload)
  }
}
export default connect(
  mapState,
  mapDispatch
)(LoginComponent)
