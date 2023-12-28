import React from 'react'
import "./Header.css";
import img1 from "./Logo.png"

const Header = () => {
  return (
    <div onClick={()=>window.scroll(0,0)}><span className='header'><img className='logoHeader' src={img1} alt="Logo"/>
     Watch The Future!</span></div>
  )
}

export default Header