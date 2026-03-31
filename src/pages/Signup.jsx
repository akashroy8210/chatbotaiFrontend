import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from "../server/api"
import { AuthContext } from '../context/AuthContext';
function Signup() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const login = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSignup = async () => {
        try {
            setLoading(true)
            
            const res = await api.post('/api/users/signup', { name, email, password })
            setStep(2)
            setError("")
            login(res.data.token)
        } catch (err) {
            setLoading(false)
            setError(err.response.data.message)
            console.log(err)
        }
    }
    const handleVerify = async () => {
        try {
            setLoading(true)
            const res = await api.post('/api/users/verify-otp', { email, otp })
            // localStorage.setItem('token',res.data.token)
            setError("")
            console.log("user verified successfully")
            navigate('/dashboard')
        } catch (err) {
            setLoading(false)
            setError(err.response.data.message)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div
                className='bg-[#526D82] p-10 text-lg font-semibold border border-[#9DB2BF] text-[#DDE6ED] rounded-2xl'
            >
                <h1 className='text-4xl  mb-10 font-bold '>Signup</h1>
                {step === 1 ? (
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text" name="name" id="name"
                                placeholder='Enter your name'
                                value={name}
                                className='bg-[#27374D] px-4 py-2 outline-none text-[#DDE6ED] border border-[#9DB2BF] rounded-lg w-90'
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email" name="email" id="email"
                                placeholder='Enter your Email'
                                value={email}
                                className='bg-[#27374D] px-4 py-2 outline-none text-[#DDE6ED] border border-[#9DB2BF] rounded-lg w-90'
                                onChange={(e) => { setEmail(e.target.value) }}
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
                            onClick={handleSignup}
                            className='bg-[#27374D] py-0 mt-5 rounded-full cursor-pointer border border-[#9DB2BF] hover:bg-[#223043]'
                        >
                            {loading ?
                                <div className='w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin  '>
                                    
                                </div>
                                : <p>Signup</p> }
                        </button>
                        <p className='text-center font-medium'>Already have an account?<Link to="/login">Login</Link></p>
                    </div>
                ) : (
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="otp">Enter OTP</label>
                            <input type="number" name="otp" id="otp"
                                value={otp}
                                onChange={(e) => { setOtp(e.target.value) }}
                                className='bg-[#27374D] px-4 py-2 outline-none text-[#DDE6ED] border border-[#9DB2BF] rounded-lg w-90'

                            />
                        </div>
                        <button
                            className='bg-[#27374D]  mt-5 rounded-full cursor-pointer border flex items-center justify-center border-[#9DB2BF] hover:bg-[#223043]'

                            onClick={handleVerify} >{loading ?
                                <div className='w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin  '>
                                </div>
                                : <p>Verify OTP</p> }</button>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Signup
