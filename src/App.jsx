import {Route, Routes} from "react-router-dom"
import { AdminPage, BuyTicketPage, HomePage, LoginPage, RegisterPage, TicketPage, TicketPricePage, WishPage } from "./pages"
import './App.css'
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
//addes comment
function App() {
    const{setIsLogin, setUsername} = useContext(UserContext)

  function validateToken(){
    const token=  localStorage.getItem("token");
    console.log(token)

    const data = {
      token : token
    }

    fetch("https://tickefy-api.onrender.com/validateToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response =>{
      if(response.ok){
        return response.json()
      }else{
        //do nothing
      }
    })
    .then(data =>{
      console.log(data)
      if(data){
        setUsername(data)
        setIsLogin(true)
      }

    })
    .catch(error =>{
      throw new Error(error)
    })
  }

  useEffect(()=>{
    validateToken()
  }, [])

  return (

    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/ticket" element={<TicketPage/>}/>
      <Route path="/wishlist" element={<WishPage/>}/>
      <Route path="/register" element={<LoginPage/>}/>
      <Route path="/login" element={<RegisterPage/>}/>
      <Route path="/admin" element={<AdminPage/>}/>
      <Route path="/ticketprice" element={<TicketPricePage/>}/>
      <Route path="/buyticket" element={<BuyTicketPage/>}/>
    </Routes>
  )
}

export default App
