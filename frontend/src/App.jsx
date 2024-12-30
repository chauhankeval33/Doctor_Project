import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import About from './pages/About'
import Contect from './pages/Contect'
import Login from './pages/Login'
import MyAppoinment from './pages/MyAppoinment'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'



const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path='/doctor/:speciality' element={<Doctor />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contect' element={<Contect />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/MyAppoinment' element={< MyAppoinment />} />
        <Route path='/MyProfile' element={<MyProfile />} />
        <Route path='/Appointment/:docId' element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App