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

    {(typeof backendData.users === 'undefined') ? (
      <p>Loading....</p>
    ): (
      backendData.users.map((user, i) => (
        <p key={i}>{user}</p>
      ))
    )}
      <div className="App">
        <Todos />
      </div>
    </div>
    
  )
}



export default App