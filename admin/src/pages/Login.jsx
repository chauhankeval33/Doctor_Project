import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { admin_context } from '../context/admin_context'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(admin_context)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (state === "Admin") {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token);
                }else{
                    toast.error(data.message || "Login failed. Please check your credentials.")
                }
            } else {
                
                
            }



        } catch (error) {

}
    }

return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col m-auto gap-3 items-start p-8 min-w-[340px] sm:min-w-96px border rounded-xl text-[#5e5e5e] text-sm shadow-lg' >
            <p className='text-2xl m-auto font-semibold'><span className='text-primary'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#dadada] rounded  w-full mt-1 p-2' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#dadada] rounded  w-full mt-1 p-2' type="Password" required />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>login</button>
            {
                state === "Admin"
                    ? <p>Doctor Login?<span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}> Click here</span></p>
                    : <p>Admin Login?<span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}> Click here</span></p>
            }
        </div>
    </form>
)
}

export default Login