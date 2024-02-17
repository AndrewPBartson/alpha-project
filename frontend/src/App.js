import React from 'react'
import { Counter } from './features/counter/Counter'
import Navbar from './components/Navbar'
import DataPanel from './components/DataPanel'
import ControlPanel from './components/ControlPanel'
import './App.css'

function App() {
  return (
    <div className='App container'>
      <div className='row'>
        <div className='col-12'>
          <Navbar />
        </div>
      </div>
      <div className='row'>
        <DataPanel />
        <ControlPanel />
        <Counter />
      </div>
    </div>
  )
}

export default App
