import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmiteHandler = async (event) => {
    event.preventDefault()
  }
  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col m-auto items-start gap-3 border rounded-xl p-8 min-w-[340px] sm:min-w-96 text-zinc-600 shadow-lg text-sm'>
        <p className='text-2xl font-semibold'>{state === "Sign Up" ? "create account" : "login"}</p >
        <p>pleace {state === "Sign Up" ? "Sign Up" : "log in"} to book an appointment</p>
        {
          state === "Sign Up" && <div className='w-full'>
            <p>Full Name:</p>
            <input className='border border-zinc-300 rounded w-full mt-1 p-2' type="text" onChange={(e) => setName(e.target.name)} value={name} />
          </div>
        }
        <div className='w-full'>
          <p>Email:</p>
          <input className='border border-zinc-300 rounded w-full mt-1 p-2' type="text" onChange={(e) => setEmail(e.target.email)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full mt-1 p-2' type="text" onChange={(e) => setPassword(e.target.password)} value={password} />
        </div>

        <button className='bg-primary w-full text-white py-2 rounded-md text-base '>{state === "Sign Up" ? "create Account" : "Log In"}</button>
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