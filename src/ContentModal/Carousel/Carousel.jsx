import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture, unavailable } from "../../Config/config";
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

// const items = [
//   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
//   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
//   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
// ];

const Carousel = ({ media_type, id }) => {
  const [castName,setCastName]=useState(null)
  const responsive = {
    200: {
      items: 3 
    },
    512: {
      items: 7
    },
    1024: {
      items: 8 
    },
  };
  const api_key = "f3ffd8d11a71057c55ed885f5cfe4edb";

  const Url = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${api_key}&language=en-US`;
  const [credits, setCredits] = useState([]);
  const fetchCredits = async () => {
    const { data } = await axios.get(Url);
    if(data.cast.length >2){
    setCredits(data.cast)}
    else{
      // console.log(data.cast.length);
      setCastName(data.cast)
    }
  };
  const items = Object.values(credits)?.map((c) => {
    return (
      <div className="carousel_item">
        <img className="carousel_item_img"
          src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
          alt={c?.name}
          
        />
        <b className="carousel_item_name">{c?.name}</b>
      </div>
    );
  });
  const itemsName=castName?.map((c)=>{
    return(<p>{c?.name}</p>)
  })
  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    items && (<AliceCarousel
      autoPlay
      infinite
      responsive={responsive}
      mouseTracking
      items={items}
      disableButtonsControls
      disableDotsControls
    />)
  )
  
};
export default Carousel;
