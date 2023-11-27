/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

const UserContext = createContext()

const UserContextProvider = (props) => {
    
     const [isLogin, setIsLogin] = useState(false)
     const[username, setUsername] = useState("")
     const[recomendation, setRecomendation] = useState([])
     const[comedy, setComedy] = useState([])
     const[sport, setSport] = useState([])
     const[event, setEvent] = useState([])
     const[openNav, setOpenNav] = useState(false)
     const [videoPlaying, setVideoPlaying] = useState(true);


    return(
        <UserContext.Provider value={{videoPlaying, setVideoPlaying, username, setUsername, openNav, setOpenNav, recomendation, setRecomendation, isLogin, setIsLogin}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}
