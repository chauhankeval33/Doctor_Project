import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const doctor_context = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")
    const [appointment, setAppointment] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + "/api/doctor/appointments", { headers: { authorization: "Bearer " + dToken } })

            if (data.success) {
                setAppointment(data.appointments)
                console.log(data.appointments)
            } else {

                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const completeAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + "/api/doctor/complete-appointment", { appointmentId }, { headers: { authorization: "Bearer " + dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + "/api/doctor/cancel-appointment", { appointmentId }, { headers: { authorization: "Bearer " + dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { authorization: "Bearer " + dToken } })
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getProfileData = async (params) => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { authorization: "Bearer " + dToken } })
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        dToken, setDToken,
        backendUrl,
        appointment, setAppointment,
        getAppointments,
        completeAppointment, cancelAppointment,
        setDashData, dashData, getDashData,
        setProfileData, profileData, getProfileData

    }

    return (
        <doctor_context.Provider value={value}>
            {props.children}
        </doctor_context.Provider>
    )
}

export default DoctorContextProvider;
