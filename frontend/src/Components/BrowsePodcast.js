import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const BrowsePodcast = () => {

  const url="http://localhost:5000";

  const [podcastArr, setPodcast] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState("");

  const getDataFromBackend = async () => {
    setLoading(true);
    const res = await fetch(url+'/podcast/getall');
    const data = await res.json();
    setPodcast(data);
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    getDataFromBackend();
  }, [])

  const search = async () => {
    setLoading(true);
    const res = await fetch(url + "/podcast/getall");
    const data = await res.json();
    setPodcast(
      data.filter(({title}) =>
        title.toLowerCase().includes(filter.toLowerCase())
      )
    );
    setLoading(false);
    console.log(data);
  };

  // hello

  const displayPodcast = () => {
    if(!loading){
      return podcastArr.map(({_id, title, genre, thumbnail, uploadedBy}) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mt-5">
            <div className="card b-card">
            <img className='card-img-top b-img' src={url+"/"+thumbnail} alt={title} />
              <div className="card-body">
                <h5 className="text-start">{title}</h5>
                <p className="b-p text-start">{uploadedBy.username}</p>
                <p className="b-p text-start text-muted">{genre}</p> 
                <Link to={'/play/'+_id} className='btn btn-success b-btn mt-4'>Play</Link>
              </div>
            </div>
        </div> 
      ))
    }
  }
  
  return (
    <div className="b-body">
      <br/>
      <h1 className="b-h1">BROWSE</h1>
 
      <div className="input-group mt-3">
            <input
              className="form-control"
              onChange={(e) => setFilter(e.target.value)}
            />

            <button
              className="input-group-append btn btn-success b-btn"
              onClick={search}
            >
              Search
            </button>
       </div>
      <br/>
      <div className='container'>
       <div className='row'>
         {displayPodcast()}
       </div>
      </div>

    </div>
  )
}

export default BrowsePodcast