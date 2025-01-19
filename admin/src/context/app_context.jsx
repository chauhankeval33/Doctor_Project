import { createContext } from "react";


export const app_context = createContext()

const AppContextProvider = (props)=>{

    const value={

    }
    return(
        <app_context.Provider value={value}>
            {props.children}
        </app_context.Provider>
    )

}

export default AppContextProvider;