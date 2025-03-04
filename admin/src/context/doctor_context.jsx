import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import authDoctor from "../../../backend/middlewares/authDoctor";

export const doctor_context = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")
    const [appointment, setAppointment] = useState([])

    const getAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + "/api/doctor/appointments", { headers: { authorization: "Bearer " + dToken } })

            if (data.success) {
                setAppointment(data.appointments.reverse())
                console.log(data.appointments.reverse())
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
            }else {
                toast.error(data.message)
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
        getAppointments,completeAppointment,
        cancelAppointment,
    }

    return (
        <doctor_context.Provider value={value}>
            {props.children}
        </doctor_context.Provider>
    )
}

export default DoctorContextProvider;
