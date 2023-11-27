/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Footer, Navigation, RenderCard } from "../components"
import { UserContext } from "../context/UserContext"
import { Link } from "react-router-dom"

const HomePage = () => {

  const {recomendation, setRecomendation, isLogin, videoPlaying, setVideoPlaying, setComedy, setEvent, setSport, comedy, event, sport} = useContext(UserContext)
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
             const newRecommendation = [];
            const newComedy = [];
            const newSport = [];
            const newEvent = [];

            data.forEach(event => {
                switch (event.eventType) {
                    case 'concert':
                        newRecommendation.push(event);
                        break;
                    case 'comedy':
                        newComedy.push(event);
                        break;
                    case 'sport':
                        newSport.push(event);
                        break;
                    case 'event':
                        newEvent.push(event);
                        break;
                    default:
                        // Handle any other event types or errors
                        break;
                }
            });

            setRecomendation(newRecommendation);
            setComedy(newComedy);
            setSport(newSport);
            setEvent(newEvent);
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
    // Change body background color when the video is playing or loading
    if (loading || videoPlaying) {
        document.body.style.backgroundColor = '#0A0B0C'; // Dark color when loading or video playing
    } else {
        document.body.style.backgroundColor = '#171717'; // Standard color otherwise
    }

    // Cleanup function to reset the background color
    return () => {
        document.body.style.backgroundColor = '#171717'; // Reset to standard color on component unmount
    };
}, [videoPlaying, loading]);

    if(loading || videoPlaying){
    return (
        <div style={{ display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        width: '100%', }}>
          <video 
              onEnded={handleVideoEnd} 
              style={{ maxWidth: '100%', 
              maxHeight: '50vh', 
              zIndex: 1, 
              objectFit: 'cover' }} 
              autoPlay 
              muted
              playsInline
          >
              <source src="/assets/tickefy-loading.mp4" type="video/mp4"/>
          </video>
        </div>
        
    )
    }
  
  return (
    <section className="home">
      <Navigation/>

      <div className="video">
        
        <video className="hero-video" autoPlay muted loop playsInline>
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

      {recomendation.length > 0 &&
        <RenderCard label="Concert" poster={recomendation}/>
      }

    {comedy.length > 0 &&
      <RenderCard label="Comedy" poster={comedy}/>
    }

    {sport.length > 0 &&
      <RenderCard label="Sport" poster={sport}/>
    }

    {event.length > 0 &&
      <RenderCard label="Event" poster={event}/>
    }




      <Footer/>
    </section>
  )
}

export default HomePage