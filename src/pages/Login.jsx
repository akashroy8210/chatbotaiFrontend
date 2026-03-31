import React from 'react'
import { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from "../server/api"
function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('')
  const {login}=useContext(AuthContext)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const handleLogin = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await api.post('/api/users/login', { email, password })
      localStorage.setItem("user", JSON.stringify(res.data.data))
      login(res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response.data.message)
      console.log(err)
      setLoading(false)
    }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      
      <div
        className='bg-[#526D82] p-10 text-lg font-semibold border border-[#9DB2BF] text-[#DDE6ED] rounded-2xl'
      >
        <h1 className='text-4xl font-bold text-[#DDE6ED] mb-5'>Login</h1>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email">Email</label>
            <input
              type="email" name="email" id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              placeholder='Enter you Email'
              className='bg-[#27374D] px-4 py-2 outline-none text-[#DDE6ED] border border-[#9DB2BF] rounded-lg w-90'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="password">Password</label>
            <input
              type="password" name="password" id="password"
              placeholder='Enter your password'
              value={password}
              className='bg-[#27374D] px-4 py-2 outline-none text-[#DDE6ED] border border-[#9DB2BF] rounded-lg w-90'
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          {error && <p className='bg-red-100 font-semibold text-red-500 border border-red-400 text-center py-2 rounded-lg'>{error}</p>}
          <button
            className='bg-[#27374D] py-2 flex justify-center items-center mt-5 rounded-full cursor-pointer border border-[#9DB2BF] hover:bg-[#223043]'
            onClick={handleLogin} >
              {loading ? <div className='w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin  '>
                                </div> : 'Login'}

            </button>
        </div>
        <p className='text-center font-medium mt-4'>Create an Account?<Link to="/" className='ml-2' >Signup</Link></p>
      </div>
    </div>
  )
}

export default Login
