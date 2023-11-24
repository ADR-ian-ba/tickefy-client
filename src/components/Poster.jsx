import { useState } from "react"

/* eslint-disable react/prop-types */
const Poster = ({item}) => {
    const [concertName, setConcertName] = useState('');
    const [concertDescription, setConcertDescription] = useState('');
    const [concertArtist, setConcertArtist] = useState('');
    const [concertHeroImage, setConcertHeroImage] = useState('');
    const [show, setShow] = useState([]);
    const [showDialog, setShowDialog] = useState(false)


    function handleClick(){
        console.log(item)

        const data = {
            data : item._id
        }

        fetch("http://localhost:4000/concertdata",{
            method: "POST",
            headers: {
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
            const {concertName, concertDescription, concertArtist, concertHeroImage, shows} = data
            console.log(concertName, concertDescription, concertArtist, concertHeroImage, shows)
            setConcertName(concertName)
            setConcertDescription(concertDescription)
            setConcertArtist(concertArtist)
            setConcertHeroImage(concertHeroImage)
            setShow(shows)       
        })
        .catch(error=>{
            throw new Error(error)
        })

        setShowDialog(true)
        
    }

    function findTicket(showid, parentid, shownum, concertname){
        console.log(showid, parentid)
        window.location.href = `/ticketprice?showid=${showid}&parentid=${parentid}&shownum=${shownum}&concertname=${concertname}`
    }




  return (
    <>
    <div className="poster-holder" onClick={handleClick}>
        <img src={item["concertPosterImage"]} alt="" />
    </div>

    {showDialog ? 
        <div className="dialog">
            <div className="dialog-inner">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=> setShowDialog(false)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                <div className="image-div">
                    <img src={concertHeroImage} alt="" />
                </div>
                <div className="black-filter"></div>


                <div className="concert-bundle">
                    <h1 className="concert-name">{concertName}</h1>
                    <h3 className="concert-artist">{concertArtist}</h3>
                    <p className="concert-description">{concertDescription}</p>
                </div>

                <div className="show-div">
                    {show.map((each, index) => (
                    <div key={index}>
                        <div className="show-information">
                            <div className="div-1">
                                <h1>Show {index+1}</h1>
                                <button onClick={()=>findTicket(each.showId, item._id, index+1, concertName, item._id)}>See Ticket</button>
                            </div>
                            <div className="div-2">
                                <p><span>Date:</span> {each.showDate}</p>
                                <p><span>Time:</span> {each.showTime}</p>
                                <p><span>Location:</span> {each.showLocation}</p>
                            </div>

                        </div>

                    </div>
                    ))}
                </div>
                
            </div>
        </div>
    :
        <></>

    }



    </>

  )
}

export default Poster