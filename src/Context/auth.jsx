import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


export const auth = createContext(null)

export function AuthContextProvider({ children }) {
    let [token, setToken] = useState(null)
    let [user ,setUser] = useState(null)

    
    useEffect(()=>{
        if(localStorage.getItem('userToken'))
            {
                setUser(jwtDecode(localStorage.getItem('userToken')))
                setToken(localStorage.getItem('userToken'))
            }
    },[])

    return <auth.Provider value={{setToken,setUser,token,user}}>
        {children}
    </auth.Provider>
}