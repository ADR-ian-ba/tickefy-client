import { useContext, useEffect, useState } from "react"
import { Footer, Navigation, RenderCard } from "../components"
import { UserContext } from "../context/UserContext"
import { Link } from "react-router-dom"

const HomePage = () => {

  const {recomendation, setRecomendation, isLogin, videoPlaying, setVideoPlaying} = useContext(UserContext)
  const[loading, setLoading] = useState(true)

  useEffect(() => {
         fetch("https://tickefy-api.onrender.com/data", {
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
         })
         .finally(()=>{
          setLoading(false)
  
         });
     }, []);

     const handleVideoEnd = () => {
      setVideoPlaying(false);
  };

  useEffect(() => {
    // Change body background color when the video is playing
    if (videoPlaying) {
        document.body.style.backgroundColor = '#121212';
    } else {
        document.body.style.backgroundColor = '#171717';
    }

    // Cleanup function to reset the background color
    return () => {
        document.body.style.backgroundColor = '#171717';
    };
}, [videoPlaying]);

    // if(loading || videoPlaying){
    // return (
    //     <div style={{ display: 'flex', 
    //     justifyContent: 'center', 
    //     alignItems: 'center', 
    //     height: '100vh', 
    //     width: '100%', }}>
    //       <video 
    //           onEnded={handleVideoEnd} 
    //           style={{ maxWidth: '100%', 
    //           maxHeight: '50vh', 
    //           zIndex: 1, 
    //           objectFit: 'cover' }} 
    //           autoPlay 
    //       >
    //           <source src="/assets/tickefy-loading.mp4" type="video/mp4" />
    //       </video>
    //     </div>
        
    // )
    // }
  
  return (
    <section className="home">
      <Navigation/>

      <div className="video">
        
        <video className="hero-video" autoPlay muted loop>
          <source src="/assets/hero.mp4" type="video/mp4"/>
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