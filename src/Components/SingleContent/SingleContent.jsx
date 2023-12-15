import React from "react";
import { img_300, unavailable } from "../../Config/config";
import './SingleContent.css';
import Badge from '@mui/material/Badge';
import ContentModal from "../../ContentModal/ContentModal";

const SingleContent = ({
  id,
  key,
  title,
  poster,
  date,
  media_type,
  vote_average,
  
}) => {
  return (
    <>
      <ContentModal media_type={media_type} id={id}>
       <Badge badgeContent={vote_average} color={vote_average>6?"primary":"secondary"}/>
        <img className="poster" src={poster?`${img_300}${poster}`:unavailable} alt={title} />
        <b className="title">{title}</b>
        <div className="subTitle">
        <span >{media_type==='tv'?"Tv-series":"Movie"}</span>
        <span >{date}</span>
        </div>
        </ContentModal>
      
    </>
  );
};

export default SingleContent;
