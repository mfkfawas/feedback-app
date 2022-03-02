//index.js is the entry point.
import React from 'react'
//React DOM library allows you to interact with DOM on the browser.
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
