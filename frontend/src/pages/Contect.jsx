import React from 'react'
import { assets } from '../assets/assets'

const Contect = () => {
  return (
    <div>
      <div className='text-center pt-10 text-2xl text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 text-sm mb-28'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-gray-600 text-lg'>OUR OFFICE</p>
          <p className=' text-gray-500 '>101,param bulding <br />varacha road, surat</p>
          <p className=' text-gray-500 '>Tel:(+91) 9033709070 <br />Email:param@gmail.com</p>
          <p className='font-semibold text-gray-600 text-lg'>careers at param</p>
          <p className='text-gray-500'>Learn more about our team and job openings.</p>
          <button className='border border-black text-sm px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'> Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contect