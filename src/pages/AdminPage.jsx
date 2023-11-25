import { useEffect, useState } from 'react';

const AdminPage = () => {
    const [posterImage, setPosterImage] = useState(null);
    const [heroImage, setHeroImage] = useState(null);
    const [concertName, setConcertName] = useState('');
    const [description, setDescription] = useState('');
    const [artist, setArtist] = useState('');
    const [showNumber, setShowNumber] = useState(1);
    const[type, setType] = useState("")
    const [shows, setShows] = useState([{ 
      catImage: null, 
      catNumber: 0, 
      catPrices: [], 
      date: '', 
      time: '', 
      location: '' 
    }]);    const [formDataObject, setFormDataObject] = useState({
      type: "",
      posterImage: null,
      heroImage: null,
      concertName: '',
      description: '',
      artist: '',
      showNumber: 1,
      shows: [{ catImage: null, catNumber: '', date: '', time: '', location: '' }],
    });
  
    useEffect(() => {
      setShows(previousShows => {
        const newShows = Array.from({ length: showNumber }, (_, i) => previousShows[i] || { catImage: null, catNumber: '', date: '', time: '', location: '' });
        return newShows;
      });
    }, [showNumber]);
  
    const handleInputChange = (setter, key) => (event) => {
      const value = event.target.value;
      setter(value);
  
      setFormDataObject(prevState => ({
        ...prevState,
        [key]: value,
      }));
    };
  
    const handleFileChange = (setter, key) => (event) => {
      const file = event.target.files[0];
      if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          setter(base64Image);
  
          setFormDataObject(prevState => ({
            ...prevState,
            [key]: base64Image,
          }));
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleShowChange = (index, key, value) => {
      const updatedShows = [...shows];
      const updatedShow = { ...updatedShows[index] };
    
      if (key === 'catImage') {
        const file = value;
        if (file && file.type.match('image.*')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            updatedShow.catImage = e.target.result; // Base64 string
            updatedShows[index] = updatedShow;
            setShows(updatedShows);
          };
          reader.readAsDataURL(file);
        }
      } else if (key === 'catNumber') {
        value = parseInt(value, 10);
        updatedShow.catNumber = value;
        updatedShow.catPrices = Array(value).fill(0); // Initialize all prices with 0
      } else if (key.startsWith('catPrice')) {
        const priceIndex = parseInt(key.split('-')[1], 10);
        updatedShow.catPrices[priceIndex] = parseFloat(value);
      } else {
        updatedShow[key] = value;
      }
    
      if (key !== 'catImage') {
        updatedShows[index] = updatedShow;
        setShows(updatedShows);
      }
    };
    
  
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataObject = {
          type: type,
          posterImage,
          heroImage,
          concertName,
          description,
          artist,
          showNumber,
          shows,
        };

        const formData = new FormData();
    
        if (posterImage) {
          formData.append('posterImage', posterImage);
        }
        if (heroImage) {
          formData.append('heroImage', heroImage);
        }

        console.log(formDataObject)

        try{
            fetch('https://tickefy-api.onrender.com/uploadconcert', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(formDataObject),
            })
            .then((response) => {
                if (response.ok) {
                return response.json(); 
                } else {
                throw new Error('Failed to send data to the server');
                }
            })
            .then((data) => {
                console.log('Server Response:', data); 
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
            }catch(error){
                null
            }
      };
  

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="posterImage">Poster Image:</label><br/>
        <input type="file" id="posterImage" name="posterImage" accept="image/*" onChange={handleFileChange(setPosterImage)}/><br/>
        {posterImage && <img src={posterImage} alt="Poster Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}<br/>

        <label htmlFor="heroImage">Hero Image:</label><br/>
        <input type="file" id="heroImage" name="heroImage" accept="image/*" onChange={handleFileChange(setHeroImage)} /><br/>
        {heroImage && <img src={heroImage} alt="Hero Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}<br/>

        <label htmlFor="concertName">Concert Name:</label><br/>
        <input type="text" id="concertName" value={concertName} onChange={handleInputChange(setConcertName)} /><br/>

        <label htmlFor="description">Description:</label><br/>
        <textarea id="description" value={description} onChange={handleInputChange(setDescription)}></textarea><br/>

        <label htmlFor="concert-type">Select type:</label>
      <select id="concert-type" value={type}  onChange={(ev)=> setType(ev.target.value)} >
        <option value="concert">concert</option>
        <option value="comedy">comedy</option>
        <option value="sport">sport</option>
        <option value="Event">Event</option>
      </select>
      <br/>

        <label htmlFor="artist">Artist:</label><br/>
        <input type="text" id="artist" value={artist} onChange={handleInputChange(setArtist)} /><br/>
    
        <label htmlFor="showNumber">Number of Shows:</label><br/>
        <input type="number" id="showNumber" value={showNumber} onChange={(e) => setShowNumber(parseInt(e.target.value) || 1)} /><br/>

        {shows.map((show, index) => (
          <div key={index}>
            <label>Cat Image for Show {index + 1}:</label><br/>
            <input 
              type="file" 
              name={`catImage${index}`} 
              accept="image/*" 
              onChange={(e) => handleShowChange(index, 'catImage', e.target.files[0])} 
            /><br/>

            <label>Cat Number for Show {index + 1}:</label><br/>
            <input type="number" name={`catNumber${index}`} value={show.catNumber} onChange={(e) => handleShowChange(index, 'catNumber', e.target.value)} /><br/>

            {Array.from({ length: show.catNumber }).map((_, priceIndex) => (
              <div key={priceIndex}>
                <label>Price for Cat {priceIndex + 1}:</label><br/>
                <input 
                  type="number" 
                  name={`catPrice-${priceIndex}`}
                  value={show.catPrices[priceIndex] || 0}
                  onChange={(e) => handleShowChange(index, `catPrice-${priceIndex}`, e.target.value)}
                /><br/>
              </div>
            ))}

            <label>Date for Show {index + 1}:</label><br/>
            <input type="date" name={`date${index}`} value={show.date} onChange={(e) => handleShowChange(index, 'date', e.target.value)} /><br/>

            <label>Time for Show {index + 1}:</label><br/>
            <input type="time" name={`time${index}`} value={show.time} onChange={(e) => handleShowChange(index, 'time', e.target.value)} /><br/>

            <label>Location for Show {index + 1}:</label><br/>
            <input type="text" name={`location${index}`} value={show.location} onChange={(e) => handleShowChange(index, 'location', e.target.value)} /><br/><br/>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default AdminPage;
