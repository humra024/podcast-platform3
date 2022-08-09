import React, {useEffect, useState}  from 'react'
import { useParams } from 'react-router-dom';



const Play = () => {

  const {id}= useParams();

  const url="http://localhost:5000";

  const [podcastArr, setPodcast] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataFromBackend = async () => {
    setLoading(true);
    const res = await fetch(url+'/podcast/getbyid/'+id);
    const data = await res.json();
    setPodcast(data);
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    getDataFromBackend();
  }, [])


  const displayPlay = () => {
    if(!loading && podcastArr){
      return <div className="p-contact p-2 m-4">
        <div className="p-contact-left">
    
          <img className="p-img" src={url+"/"+podcastArr.thumbnail} alt={podcastArr.title}>
            </img>

   
        </div>

        <div className="p-contact-right">
            <h1 className="r-signup-h" >{podcastArr.title}</h1> 
            <p className="p-p">{podcastArr.uploadedBy ? podcastArr.uploadedBy.username : ''}</p>
            <p className="p-p mb-4">{podcastArr.genre}</p>
            
            <audio src={url+"/"+podcastArr.audio} alt={podcastArr.title} controls className="p-audio mt-2">   
            </audio> 
            <div className="p-descript">
            <p className="mt-2">{podcastArr.description}</p>
            </div>
           
            
        </div>
      </div>
      
    }
  }

  return (
    <div className="p-body">
     
     {displayPlay()}
        
    </div>
  )
}

export default Play