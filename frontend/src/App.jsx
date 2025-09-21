import { useState } from 'react'
import RefreshHandlers from './RefreshHandlers'

import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivatedRouted = ({element}) =>{
    return isAuthenticated ? element : <Navigate to ='/login' />
  }


  return (
    <>
      <div className="App">

        <RefreshHandlers setIsAuthenticated={setIsAuthenticated} />
        
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<PrivatedRouted element={<Home />} />} />
        </Routes>
      </div>

    </>
  )
}

export default App
