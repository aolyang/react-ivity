import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useCount } from './store'

function App() {
  const [count, setCount] = useCount(2)
  console.log("App count", count)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => {
            setCount(count + 1)
          }}>
            count in App context is: {count}
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
