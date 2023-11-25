import { useEffect } from "react"
import { Footer, Navigation } from "../components"

const TicketPage = () => {

  function getData(){
    const data = {
      token : localStorage.getItem("token")
    }

    fetch("https://tickefy-api.onrender.com/getbidoffer",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    .then(response=>{
      if(!response.ok){
        null
      }
      return response.json()
    })
    .then(data=>{
      console.log(data)
    })
    .catch(error=>{
      throw new Error(error)
    })
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <section>
      <Navigation/>

      <h1>You have not bought any ticket</h1>

      <Footer/>
    </section>
  )
}

export default TicketPage