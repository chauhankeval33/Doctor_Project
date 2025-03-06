import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { admin_context } from '../context/admin_context'
import {useNavigate} from "react-router-dom"
import { doctor_context } from '../context/doctor_context'

const Navbar = () => {

    const { aToken,setAToken } = useContext(admin_context)
    const{dToken,setDToken} = useContext(doctor_context)
    
    const navigate = useNavigate()

    const Logout =()=>{
        navigate('/')
        aToken && setAToken('')
        setAToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken') 
    }

    return (
        <div className='flex justify-between items-center py-3 px-4 sm:px-10 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border rounded-full border-gray-500 text-gray-600 px-2.5 py-0.5'>{aToken ? "Admin" : "Doctor"}</p>
            </div>
            <button onClick={Logout} className='bg-primary rounded-full px-10 py-2 text-white'>Logout</button>
        </div>
    )
}

export default Navbar