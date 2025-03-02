import React, { useContext, useEffect } from 'react'
import { admin_context } from '../../context/admin_context'
import { assets } from '../../assets/assets'
import { app_context } from '../../context/app_context'


const Dashboard = () => {

  const { aToken, getDasdhData, cancelAppointment, dashData } = useContext(admin_context)

  const {sloatDateFormat} = useContext(app_context) 

  useEffect(() => {
    if (aToken) {
      getDasdhData()
    }
  }, [aToken])
  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Booking</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointment.map((item, index) => (
              <div className='flex items-center px-6 py-3 hover:bg-gray-100 'key={index}>
                <img className='rounded-full w-10 ' src={item.docData.image} alt="" />
                <div className=' flex-1 text-sm'>
                  <p className='text-gray-600 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-800'>{sloatDateFormat(item.slotDate)}</p>  
                </div>
                {
                  item.cancelled
                    ? <p className='text-red-400 text-sm front-medium'>cancelled</p>
                    : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard