import { useContext, useEffect } from "react"
import { Footer, Navigation, RenderCard } from "../components"
import { UserContext } from "../context/UserContext"
import { Link } from "react-router-dom"

const HomePage = () => {

  const {recomendation, setRecomendation, isLogin} = useContext(UserContext)

  useEffect(() => {
         fetch("http://localhost:4000/data", {
             method: "GET",
             headers: {
                 "Content-Type": "application/json"
             }
         })
         .then(response => {
             if (!response.ok) {
                 throw new Error("Something went wrong");
             }
             return response.json();
         })
         .then(data => {
             console.log(data);
             setRecomendation(data)
         })
         .catch(error => {
             console.error('Error:', error);
         });
     }, []);
 
     useEffect(()=>{
       console.log(recomendation)
     },[recomendation])
  
  return (
    <section className="home">
      <Navigation/>

      <div className="video">
        
        <video className="hero-video" autoPlay muted loop>
          <source src="../public/assets/hero.mp4" type="video/mp4"/>
        </video>
      </div>

      <div className="hero-title">
        <h1 >Discover Your Passion</h1>
        <h1 >With <span>Tickefy</span></h1>
        {isLogin ?
          <button className="register-button">About Us</button>
        :
        <>
          <Link style={{textDecoration:"none"}} to="/login">
            <button style={{display: "block"}} className="login-button">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="register-button">
              Register
            </button>
          </Link>
        </>

        }
        
      </div>

      <div className="spacer-vid"></div>
      <RenderCard label="For You" poster={recomendation}/>





      <Footer/>
    </section>
  )
}

export default HomePage