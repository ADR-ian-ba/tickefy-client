import {Link, NavLink} from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useContext} from "react"
const Navigation = () => {
    const{isLogin, openNav, setOpenNav, username, setIsLogin, setUsername} = useContext(UserContext)

    function logout(){
      localStorage.clear()
      setIsLogin(false)
      setUsername("")
    }

  return (
    <>
    <Link to="/">
      <img className="logo-mobile" src="../public/assets/tickefy.png" alt="tickefy" />
    </Link>
      
      <svg style={{position:"fixed"}} onClick={()=> setOpenNav(!openNav)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`exit ${openNav ? "" : "display-none"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>

      <svg onClick={()=> setOpenNav(!openNav)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`menu ${openNav ? "display-none" : ""}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
      </svg>
      <div className="filler"></div>
      <nav className={`${openNav ? "open-nav" : ""}`}>
        <ul>
          <li  className="logo-li">
            <Link to="/">
              <img className="logo" src="../public/assets/tickefy.png" alt="tickefy" />
            </Link>
          </li>
            <NavLink style={{color: "#ffffff", textDecoration:"none"}} to="/" className={({isActive}) => (isActive ? "active-style" : "none")} >
              <li>Home</li>
            </NavLink>
            <NavLink style={{color: "#ffffff", textDecoration:"none"}} to="/ticket" className={({isActive}) => (isActive ? "active-style" : "none")}>
              <li>Ticket</li>
            </NavLink>
            <NavLink style={{color: "#ffffff", textDecoration:"none"}} to="/wishlist" className={({isActive}) => (isActive ? "active-style" : "none")}>
              <li>Wishlist</li>
            </NavLink>
        </ul>


        <ul>
          {isLogin ?
          
          <li style={{display:"flex", alignItems:"center"}} onClick={logout}>
            <h3 onClick={logout}>
              {username}
            </h3>
            <svg onClick={logout} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{height:"30px", width:"30px", position:"static", display:"block"}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>

          </li>
        :
        <>
          <NavLink style={{color: "#ffffff", textDecoration:"none"}} to="/login" className={({isActive}) => (isActive ? "active-style" : "none")}>
            <li>Login</li>
          </NavLink>
          <NavLink style={{color: "#ffffff", textDecoration:"none"}} to="/register" className={({isActive}) => (isActive ? "active-style" : "none")}>
            <li>Register</li>
          </NavLink>

        </>

        }

        </ul>
      </nav>
    </>
  )
}

export default Navigation