import React from 'react'
import logo from './logo.svg'
import './App.css'
import Button from '@mui/material/Button'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div>
          <Button variant='contained'>Hello World</Button>
        </div>
      </header>
    </div>
  )
}

export default App
