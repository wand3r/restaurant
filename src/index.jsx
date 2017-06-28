import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'
import store from './store'

const rootEl = document.getElementById('root')
const renderApp = () =>
  ReactDOM.render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    rootEl)
renderApp()
if (module.hot) module.hot.accept('./app', () => renderApp())
