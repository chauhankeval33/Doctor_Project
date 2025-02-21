import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmiteHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Sign up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }else{
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
if (token) {
  navigate('/')
}
  },[token])
  return (
    <form onSubmit={onSubmiteHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col m-auto items-start gap-3 border rounded-xl p-8 min-w-[340px] sm:min-w-96 text-zinc-600 shadow-lg text-sm'>
        <p className='text-2xl font-semibold'>{state === "Sign Up" ? "create account" : "login"}</p >
        <p>pleace {state === "Sign Up" ? "Sign Up" : "log in"} to book an appointment</p>
        {
          state === "Sign Up" && <div className='w-full'>
            <p>Full Name:</p>
            <input className='border border-zinc-300 rounded w-full mt-1 p-2' type="text" onChange={(e) => setName(e.target.value)} value={name} />
          </div>
        }
        <div className='w-full'>
          <p>Email:</p>
          <input className='border border-zinc-300 rounded w-full mt-1 p-2' type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full mt-1 p-2' type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <button type='submit' className='bg-primary w-full text-white py-2 rounded-md text-base '>{state === "Sign Up" ? "create Account" : "Log In"}</button>
        {
          state === "Sign Up"
            ? <p>Already have an account <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer '>Login here </span></p>
            : <p>Create an new account <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }

      </div>
    </form>
  )
}

export default Login