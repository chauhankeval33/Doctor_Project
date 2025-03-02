import { createContext } from "react";


export const app_context = createContext()

const AppContextProvider = (props) => {

    const currency = "₹"

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const sloatDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const value = {
        calculateAge, sloatDateFormat,
        currency
    }
    return (
        <app_context.Provider value={value}>
            {props.children}
        </app_context.Provider>
    )

}

export default AppContextProvider;