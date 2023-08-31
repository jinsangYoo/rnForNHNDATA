import React from 'react'
import {makeStore} from './src/store'
import {Provider as ReduxProvider} from 'react-redux'
import App from './App'

const store = makeStore()

const AppWrapper = () => {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  )
}

export default AppWrapper
