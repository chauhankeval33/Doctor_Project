import React, { useContext, useEffect } from 'react'
import { doctor_context } from '../../context/doctor_context'
import { app_context } from '../../context/app_context'
import { assets } from '../../assets/assets'

const doctorAppointment = () => {

  const { dToken, appointment, getAppointments, completeAppointment, cancelAppointment, } = useContext(doctor_context)

  const { calculateAge, sloatDateFormat, currency } = useContext(app_context)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Pationt</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
        {
          appointment.map((item, index) => (
            <div className=' flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2 '>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>
                  {item.payment ? 'Online' : 'CASH'}
                </p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{sloatDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency}{item.amount}</p>
              <div className='flex'>
                <img onClick={() => cancelAppointment()} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                <img onClick={() => completeAppointment()} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default doctorAppointment