import { createContext } from "react";

export const doctor_context = createContext()

const DoctorContextProvider = (props) => {

    const value = {

    }
    return (
        <doctor_context.Provider value={value}>
            {props.children}
        </doctor_context.Provider>
    )
}

export default DoctorContextProvider;
