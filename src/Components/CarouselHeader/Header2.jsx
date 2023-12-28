import React, { useState } from "react";
import "./Header.css";
// import { space } from 'postcss/lib/list';
// import {Carousel} from 'react-responsive-carousel'
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";

const handleDragStart = (e) => e.preventDefault();
const [items,setItems]=useState([])

const Gallery = () => {
  return <AliceCarousel mouseTracking items={items} autoPlay />;
};

const Header = ({id,media_type}) => {
 

const api_key = "f3ffd8d11a71057c55ed885f5cfe4edb";
const Url = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${api_key}&language=en-US`;
const fetchPosters=async()=>{
  const {data}=await axios.get(Url);
  console.log(data.results)
}
  // return (
  //   <div onClick={()=>window.scroll(0,0)}><span className='header'>🎥 Entertainment Hub! 🎥</span></div>
  // )
  return (
    <div>
      <Gallery />
    </div>
  );
};

export default Header;
