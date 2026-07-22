// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<NavBar />}/> 
      </Routes>
    </>
  )
}

export default App