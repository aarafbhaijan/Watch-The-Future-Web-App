import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SingleContent from "../SingleContent/SingleContent.jsx";
import CustomPagination from "../CustomPagination/CustomPagination.jsx";

import './Trending.css'
const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  


  const api_key = "f3ffd8d11a71057c55ed885f5cfe4edb";
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`
    );
    setContent(data.results);
    
  };
  useEffect(() => {
    fetchTrending();
    // react-hooks/exhaustive-deps
  }, [page]);
  return (
    <>
      <span className='pageTitle'>Trending</span>
      <div className="trending">
        {content && content.map((c) => {
          return(
            <SingleContent
              id={c.id}
              key={c.id}
              title={c.title || c.name}
              poster={c.poster_path}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
              
            />)
          })}
          <CustomPagination setPage={setPage}/>
      </div>
    </>
  );
};

export default Trending;
