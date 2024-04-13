import { useState, React } from 'react'
import './App.css'
import mainIcon from './assets/tech.png'
import AllRoutes from './components/AllRoutes'


function App() {
  

  return (
    <div className="App">
      <header>
        <div className="title">
          <h4>WTech Smarthphones</h4>
          <p>inventory</p>
        </div>
        <div className="logo">
          <img src={mainIcon} alt="Main Icon" />
        </div>
      </header>
      <main>
      </main>
    </div>
  )
}

export default App
