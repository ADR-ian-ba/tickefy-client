/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Footer, Navigation } from '../components';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const BuyTicketPage = () => {
    const query = useQuery()

    const catId = query.get("catnum")
    const showId = query.get("showid")
    const showPrice = query.get("showprice")
    const concertId = query.get("concertid")

    const[bidId, setBidId] = useState(null)
    const[image, setImage] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const[buyQuantity, setBuyQuantity] = useState(1)
    const[sellQuantity, setSellQuantity] = useState(1)
    const[buyPrice, setBuyPrice] = useState(0)
    const[sellPrice, setSellPrice] = useState(0)
    const[dialogBuy, setDialogBuy] = useState(false)
    const[dialogSell, setDialogSell] = useState(false)
    const[buyData, setBuyData] = useState(null)
    const[sellData, setSellData] = useState(null)

    useEffect(() => {
        const data = {
            catId: catId,
            showId: showId,
            concertId: concertId
        };

        fetch("https://tickefy-api.onrender.com/getcat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                // Handle the error
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setBidId(data.bidId);
            setImage(data.image);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

    }, [catId, showId, concertId]);

    function increase(){
        if(quantity >= 5){
            null
        }else{
            setQuantity(quantity+1)
        }
    }
    function decrease(){
        if(quantity <= 1){
            null
        }else{
            setQuantity(quantity-1)
        }
    }
    function marketIncrease(){
        if(buyQuantity >= 5){
            null
        }else{
            setBuyQuantity(buyQuantity+1)
        }
    }
    function marketDecrease(){
        if(buyQuantity <= 1){
            null
        }else{
            setBuyQuantity(buyQuantity-1)
        }
    }
    function sellIncrease(){
        if(sellQuantity >= 5){
            null
        }else{
            setSellQuantity(sellQuantity+1)
        }
    }
    function sellDecrease(){
        if(sellQuantity <= 1){
            null
        }else{
            setSellQuantity(sellQuantity-1)
        }
    }

    function sendBuy(){
        setDialogBuy(false)
        const data = {
            json: localStorage.getItem("token"),
            catId: catId,
            concertId: concertId,
            showId: showId,
            quantity: buyQuantity,
            price: buyPrice
        }

        fetch("https://tickefy-api.onrender.com/getbid",{
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
            const { bid, offer } = data;
            console.log(bid);
            console.log(offer);
        
            const sortedBid = bid.sort((a, b) => b[0] - a[0]);
        
            const sortedOffer = offer.sort((a, b) => b[0] - a[0]);
        
            setBuyData(sortedBid);
            setSellData(sortedOffer);
        })
        .catch(error=>{
            throw new Error(error)
        })
    }

    function sendSell(){
        setDialogSell(false)
        const data = {
            json: localStorage.getItem("token"),
            catId: catId,
            concertId: concertId,
            showId: showId,
            quantity: sellQuantity,
            price: sellPrice
        }

        fetch("https://tickefy-api.onrender.com/getoffer",{
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
            const { bid, offer } = data;
            console.log(bid);
            console.log(offer);
        
            const sortedBid = bid.sort((a, b) => b[0] - a[0]);
        
            const sortedOffer = offer.sort((a, b) => b[0] - a[0]);
        
            setBuyData(sortedBid);
            setSellData(sortedOffer);

        })
        .catch(error=>{
            throw new Error(error)
        })
    }

    function getPrice(){
        const data = {
            catId: catId,
            concertId: concertId,
            showId: showId,
        }

        fetch("https://tickefy-api.onrender.com/getprice", {
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
            const { bid, offer } = data;
            console.log(bid);
            console.log(offer);
        
            const sortedBid = bid.sort((a, b) => b[0] - a[0]);
        
            const sortedOffer = offer.sort((a, b) => b[0] - a[0]);
        
            setBuyData(sortedBid);
            setSellData(sortedOffer);
        })
        .catch(error=>{
            throw new Error(error)
        })
    }

    useEffect(()=>{
        getPrice()
    },[])
        
  return (
    <section className='cat-buy'>
        <Navigation/>
        <h1>CAT {parseInt(catId,10)+1}</h1>

        {image ?
        <div className="image-wrapper">
            <img src={image} alt="concert image" />
        </div>
        :
        <></>
        }

        <div className="info-wrapper">
            <p className='official'>Official</p>
            <div className="price-qt-wrapper">
                <p className='price'>Rp {showPrice.toString().split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('')}</p>

                <div className="increaser">
                    <p style={{fontSize:"1.5rem"}}>quantity</p>
                    <div className="control">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={increase}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        <p>{quantity}</p>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={decrease}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </div>
                </div>
                
            </div>
            <button className='buy-official'>Buy Official's</button>
        </div>

        <div className="secondary-wrapper">
        <p className='official'>Secondary market</p>
        <div className="table">
            <div className="buy">
                <div className="column">
                    <h5>Buy</h5>
                    <h5>Bid Vol</h5>
                    <h5>Bid</h5>
                    {buyData ?
                     buyData.map((each, index)=>(
                        <>
                            <button key={index}>B</button>
                            <p>{each[1]}</p>
                            <p>{each[0].toString().split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('')}</p>
                        </>
                     ))

                    :
                    <></>
                    }
                </div>
            </div>
            <div className="offer">
                <div className="column">
                    <h5>Offer</h5>
                    <h5>Off Vol</h5>
                    <h5>Sell</h5>

                    {sellData ?
                     sellData.map((each, index)=>(
                        <>
                            <p key={index}>{each[0].toString().split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('')}</p>
                            <p>{each[1]}</p>
                            <button>S</button>
                        </>
                     ))

                    :
                    <></>
                    }

                </div>
            </div>
        </div>

                    {/* {buyData ?
                     buyData.map((each, index)=>(
                        <tr key={index}>
                            <td><button>B</button></td>
                            <td>{each[1]}</td>
                            <td>{each[0]}</td>
                        </tr>
                     ))

                    :
                    <></>
                    }
                    {sellData ?
                     sellData.map((each, index)=>(
                        <tr key={index}>
                            <td><button>B</button></td>
                            <td>{each[1]}</td>
                            <td>{each[0]}</td>
                        </tr>
                     ))

                    :
                    <></>
                    } */}
        </div>

        <div className="market-order-wrapper">
        <p>market Order</p>
        <div className="line"></div>
        </div>
        <div className="button-bundle">
            <button onClick={()=> setDialogBuy(!dialogBuy)}>Buy Now</button>
            <button onClick={()=> setDialogSell(!dialogSell)}>Sell Now</button>
        </div>

        {dialogBuy ?
            <div className="dialog">
                <svg className="close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  onClick={()=> setDialogBuy(!dialogBuy)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div className="increaser">
                    <p>quantity</p>
                    <div className="control">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={marketIncrease}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
    
                        <p>{buyQuantity}</p>
    
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={marketDecrease}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </div>
                </div>
                <p>Buy price e.g = 100000</p>
                <input type="number" value={buyPrice} onChange={(ev)=> setBuyPrice(ev.target.value)}/>
                <button onClick={sendBuy}>submit</button>
                
            </div>
        :
        <></>
        }

        {dialogSell ? 
        <div className="dialog">
            <svg className="close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  onClick={()=> setDialogSell(!dialogSell)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className="increaser">
                <p>quantity</p>
                <div className="control">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={sellIncrease}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    <p>{sellQuantity}</p>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={sellDecrease}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                </div>
            </div>
            <p>Sell price e.g = 100000</p>
            <input type="number" value={sellPrice} onChange={(ev)=> setSellPrice(ev.target.value)}/>
            <button onClick={sendSell}>submit</button>
        
        </div>
        :
        <></>
        }
            

        {/* <p>{catId}<br/>{showId}<br/>{showPrice}<br/>{concertId}</p> */}

        <Footer/>
    </section>
  )
}

export default BuyTicketPage