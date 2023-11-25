/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Footer, Navigation } from "../components"
import toast, { Toaster } from 'react-hot-toast';

//login page
const RegisterPage = () => {
  const[see, setSee] = useState(false)
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  function handleSubmit(ev){
    ev.preventDefault()
    const data = {
      email:email,
      password: password
    }

    toast.promise(
      fetch("https://tickefy-api.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        return response.json();
      })
      .then(data=>{
        const {token} = data
        console.log(token)
        localStorage.setItem("token", token);
        
        window.location.href = "/"
      }),
      {
        loading: 'Logging in...',
        success: 'Loggedin successfully!',
        error: 'Login failed'
      }
    );



  }
  return (
    <section>
        <Navigation/>
        <Toaster/>

        <div className="login-register-body">
          <h1>Welcome To <span>Tickefy</span></h1>

          <div className="login-register-box">

            <h1 style={{marginBottom:"2rem"}}>Login</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" style={{display: "block"}}>Email</label>
              <input value={email} onChange={(ev)=> setEmail(ev.target.value)} type="text" id="email" autoComplete="off" placeholder=" " />
              <label htmlFor="password" style={{display: "block"}}>Password</label>
              {see ? 
                <input value={password} onChange={(ev)=>setPassword(ev.target.value)} type="text" id="password" autoComplete="off" placeholder=" " />

              :
                <input value={password} onChange={(ev)=>setPassword(ev.target.value)} type="password" id="password" autoComplete="off" placeholder=" " />
              }

              {see ? 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={()=> setSee(!see)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={()=> setSee(!see)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
              }
              <button type="submit">Submit</button>
              <p>Already have an account?</p>
            </form>
            
            
          </div>
        </div>


        <Footer/>
    </section>
  )
}

export default RegisterPage
