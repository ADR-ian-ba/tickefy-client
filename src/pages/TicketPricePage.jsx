
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CountDownTimer, Footer, Navigation } from '../components';

// eslint-disable-next-line no-unused-vars
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const TicketPricePage = () => {
    const query = useQuery()

    const showId = query.get("showid")
    const parentId = query.get("parentid")
    const shownum = query.get("shownum")
    const concertName = query.get("concertname")

    const[item, setItem] = useState(null)

    function catData(){
        const data = {
            showId : showId,
            parentId: parentId
        }
        fetch("http://localhost:4000/catdata",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response=>{
            if(!response.ok){
                null
            }
            return response.json()
        })
        .then(data=>{
            console.log(data)
            setItem(data)
        })
        .catch(error=>{
            throw new Error(error)
        })
    }

    useEffect(() => {
        catData();
    }, [showId, parentId]);

    function handleClick(catNum, showId, showPrice){
        console.log(catNum, showId, showPrice)
        window.location.href = `/buyticket?catnum=${catNum}&showid=${showId}&showprice=${showPrice}&concertid=${parentId}`
    }


  return (
    <section className='cat-page'>
        <Navigation/>
        <h1 className='show-title'>Show {shownum}</h1>
        {item ?
        <>
        <div className="wrapper">
            <h2>{concertName}</h2>
            <CountDownTimer targetDate={item.date} targetTime={item.time}/>
        </div>
        
        <div className="image-cat">
            <img src={item.catImage} alt="" />
        </div>
        </>

        :
        <></>
        }
        {
            item ?
                item.catPrices.map((each, index) => (
                    <div className='each-cat' key={index} onClick={()=>handleClick(index, showId, each, parentId)}>
                        <h1 style={{fontSize:"2.5rem"}}>CAT {index+1}</h1>
                        <CountDownTimer targetDate={item.date} targetTime={item.time}/>
                        <p>Concert ticket starts from Idr : {each.toString().split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('')}</p>
                        <h3>Press here to see ticket</h3>
                    </div>
                ))
            :
                <></>
        }


        <Footer/>
    </section>
  )
}

export default TicketPricePage