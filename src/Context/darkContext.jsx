import { createContext, useState } from "react";




export const darkmode = createContext()

export function DarkContextProvider({children})
{
    let [dark,setDark] = useState(false)
    function toggleDark()
    {
        setDark(!dark)
        document.body.classList.toggle("dark");
    }
    return <darkmode.Provider value={{toggleDark,dark}}>
        {children}
    </darkmode.Provider>
}