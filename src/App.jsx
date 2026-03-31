import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import ResponseAi from './component/ResponseAi.jsx'
import Sidebar from './component/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
function App() {


  return (
    <div className='bg-[#F0F1F5] h-screen'  >
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />}  />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/response' element={<ResponseAi />} />
        <Route path='/sidebar' element={<Sidebar />} />
      </Routes>
    </div>
  )
}

export default App
