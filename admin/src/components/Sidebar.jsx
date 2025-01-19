import React from 'react'
import { useContext } from 'react'
import { admin_context } from '../context/admin_context'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    const { aToken } = useContext(admin_context)

    return (
        <div className='min-h-screen bg-white border-r'>{
            aToken && <ul className='text-[#515151] mt-5'>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?"bg-[#f2f3ff] border-r-4 border-primary":""}`} to={'/Dashboard'}>
                    <img src={assets.home_icon} alt="" />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?"bg-[#f2f3ff] border-r-4 border-primary":""}`} to={'/AllApointment'}>
                    <img src={assets.appointment_icon} alt="" />
                    <p>AllApointment</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?"bg-[#f2f3ff] border-r-4 border-primary":""}`} to={'/AddDoctor'}>
                    <img src={assets.add_icon} alt="" />
                    <p>AddDoctor</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?"bg-[#f2f3ff] border-r-4 border-primary":""}`}    to={"/DoctorList"}>
                    <img src={assets.people_icon} alt="" />
                    <p>DoctorList</p>
                </NavLink>
            </ul>
        }
        </div>
    )
}

export default Sidebar