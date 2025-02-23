import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'

const MyProfile = () => {

  const { userData, setUserData,token,backendUrl,loadUserProfileData } = useContext(AppContext)
  
  const [isEdit, setIsEdit] = useState(false)
  const [image,setimage] =useState(false)

  const updateUserProfileData = async ()=>{

  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      {
        isEdit
        ?<label htmlFor="">
          <div>
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </label>
        :<img className='w-36 rounded' src={userData.image} alt="" />
      }
      
      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium ma-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.name }))} />
          : <p className='text-3xl font-medium text-neutral-800 mt-4'> {userData.name} </p>
      }
      <hr className='bg-zinc-400 border-none h-[1px]' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='text-neutral-700 mt-3 gap-y-2.5 grid grid-cols-[1fr_3fr]'>
          <p className='font-medium'>Email Id:</p>
          {
            isEdit
              ? <input type="text" value={userData.email} onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))} />
              : <p className='text-blue-500'>{userData.email}</p>
          }
          <p className='font-medium'>Phone No:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>address:</p>
          {
            isEdit
              ? <p>
                <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
                <br />
                <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
              </p>
              : <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div >
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }

          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='max-w-20 bg-gray-100' type="date" value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(false)}>Save Information</button>
            : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}> Edit </button>
        }
      </div>
    </div>
  )
}

export default MyProfile