import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../SingleContent/SingleContent.jsx";
import CustomPagination from "../CustomPagination/CustomPagination";
import './Series.css'
import Genres from "../Genres/Genres.jsx";
import useGenre from "../../Hooks/useGenre.jsx";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [genres,setGenres]=useState([]);
  const [selectedGenres,setSelectedGenres]=useState([]);
  const genres_ids=useGenre(selectedGenres)
  const api_key = "f3ffd8d11a71057c55ed885f5cfe4edb";
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${api_key}&with_genres=${genres_ids}`;
  const fetchSeries = async () => {
    const { data } = await axios.get(url);
    setContent(data.results);
   
  };
  useEffect(() => {
    
    
    fetchSeries();
    // react-hooks/exhaustive-deps
  }, [page,genres_ids]);
  return (
    <>
      <span className="pageTitle">Sereis</span>
      <div className="series">
        <Genres
        type={'tv'}
        page={page}
        setPage={setPage}
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        selectedGenres={selectedGenres}
        />
        {content &&
          content.map((c) => {
            return (
              <SingleContent
                id={c.id}
                key={c.id}
                title={c.title || c.name}
                poster={c.poster_path}
                date={c.first_air_date || c.release_date}
                media_type={'tv'}
                vote_average={c.vote_average}
              />
            );
          })}
          <CustomPagination setPage={setPage} Number_of_pages={500}/>
      </div>
    </>
  );
};

export default Series;
