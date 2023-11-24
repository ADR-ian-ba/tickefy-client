/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

const UserContext = createContext()

const UserContextProvider = (props) => {
    
     const [isLogin, setIsLogin] = useState(false)
     const[username, setUsername] = useState("")
     const[recomendation, setRecomendation] = useState([])
     const[openNav, setOpenNav] = useState(false)


    return(
        <UserContext.Provider value={{username, setUsername, openNav, setOpenNav, recomendation, setRecomendation, isLogin, setIsLogin}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}
