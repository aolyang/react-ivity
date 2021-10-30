import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import TheCount from "./Info";

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('app1')
)

ReactDOM.render(
  <React.StrictMode>
    <TheCount/>
  </React.StrictMode>,
  document.getElementById('app2')
)
