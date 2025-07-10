import React, { useEffect, useState } from 'react'
import './App.css';

import Todos from './components/Todos'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      <div className="App">
        <div className="app-header">
          <h1 className="app-title">Task Man-ager</h1>
          <p className="app-subtitle">made by dylan chipun</p>
        </div>
        <Todos />
      </div>
    </div>
    
  )
}

export default App