import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";


export const admin_context = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "")
    const [doctors, setDoctors] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + "/api/admin/all-doctors", {}, { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    const changeAvailability = async (docId) => {
        try {
            const {data} =await axios.post(backendUrl+"/api/admin/change-availability", {docId}, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()

            } else {
                toast.error(error.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const value = {
        aToken, setAToken,
        backendUrl, doctors,
        getAllDoctors,changeAvailability,
    }
    return (
        <admin_context.Provider value={value}>
            {props.children}
        </admin_context.Provider>
    )

}

export default AdminContextProvider;