import { useEffect, useState } from 'react'
import './App.css'
import Weather from './weather'

function App() {

  return (
    <>
      <div className="title">
        <h1 className='title'>Weather App</h1>
      </div>
      <Weather />
    </>
  )
}

export default App
