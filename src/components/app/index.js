import React from 'react'
import AppContainer from './AppContainer'
import store from '../../store'
import { Provider } from 'react-redux'

function AppEntry() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default AppEntry
