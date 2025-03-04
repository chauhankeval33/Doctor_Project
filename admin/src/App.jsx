import React, { useContext } from "react";
import Login from "./pages/Login.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { admin_context } from "./context/admin_context.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Route, Routes } from "react-router-dom";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import AllApointment from "./pages/Admin/AllApointment.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import DoctorList from "./pages/Admin/DoctorList.jsx";
import { doctor_context } from "./context/doctor_context.jsx";
import DoctorDashboard from "./pages/Doctor/doctorDashboard.jsx";
import DoctorAppointment from "./pages/Doctor/doctorAppointment.jsx";
import DoctorProfilee from "./pages/Doctor/DoctorProfilee.jsx";

const App = () => {


    const { aToken } = useContext(admin_context)
    const { dToken } = useContext(doctor_context)

    return aToken || dToken ? (
        <div className="bg-[#f8f9fd]">
            <ToastContainer />
            <Navbar />
            <div className="flex items-start">
                <Sidebar />
                <Routes>
                    {/* Admin Route */}
                    <Route path="/" element={<></>} />
                    <Route path="/AddDoctor" element={<AddDoctor />} />
                    <Route path="/AllApointment" element={<AllApointment />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/DoctorList" element={<DoctorList />} />
                    {/* Doctor Route */}
                    <Route path="/doctorDashboard" element={<DoctorDashboard />} />
                    <Route path="/doctorAppointment" element={<DoctorAppointment />} />
                    <Route path="/doctorProfile" element={<DoctorProfilee />} />

                </Routes>
            </div>
        </div>
    ) : (<>
        <Login />
        <ToastContainer />
    </>
    )

}
export default App;