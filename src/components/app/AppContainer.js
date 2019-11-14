import React, { Component } from 'react'
import { Router, Redirect } from '@reach/router'
import Login from '../login/index'
import Home from '../home'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { auth } = this.props
    return (
      <div>
        <Router>
          <CustomRoute path="/login" component={Login} auth={auth} />
          <CustomRoute path="/" component={Home} auth={auth} />
          <NotFound default />
        </Router>
      </div>
    )
  }

  componentDidMount() {
    this.props.loadToken()
  }
}

const NotFound = () => <div>Not Found.</div>

const CustomRoute = ({ component: Component, auth, ...rest }) => {
  if (!auth || !auth.loaded) return null

  if (!auth.token && window.location.pathname !== `/login`) {
    // not logged in, redirect to login page.
    return <Redirect from="" to="login" noThrow />
  }

  if (auth.token && window.location.pathname === `/login`) {
    //  logged in, redirect to Home.
    return <Redirect from="" to="/" noThrow />
  }

  return <Component {...rest} />
}

CustomRoute.propTypes = {
  component: PropTypes.elementType,
  auth: PropTypes.object.isRequired
}
App.propTypes = {
  auth: PropTypes.object.isRequired,
  loadToken: PropTypes.func.isRequired
}
const mapStateToProps = state => ({ auth: state.auth })

const mapDispatch = ({ auth: { loadToken } }) => ({
  loadToken: () => loadToken()
})

export default connect(
  mapStateToProps,
  mapDispatch
)(App)
