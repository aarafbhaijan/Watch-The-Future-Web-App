import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../SingleContent/SingleContent.jsx";
import Genres from "../Genres/Genres.jsx";
import useGenre from "../../Hooks/useGenre.jsx";

import "../SingleContent/SingleContent.css";

import "./Movies.css";

import CustomPagination from "../CustomPagination/CustomPagination.jsx";

const Movies = () => {
  const api_key = "f3ffd8d11a71057c55ed885f5cfe4edb";

  const [page, setPage] = useState(1);

  const [content, setContent] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genres_ids = useGenre(selectedGenres);
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${api_key}&with_genres=${genres_ids}`;

  const fetchMovies = async () => {
    const { data } = await axios.get(url);
    setContent(data.results);
    setNumberOfPages(data.total_pages >= 500 ? 500 : data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // react-hooks/exhaustive-deps
    console.log(content);
  }, [page, genres_ids]);
  return (
    <>
      <span className="pageTitle">Movies</span>
      <div className="movies">
        <Genres
          type="movie"
          genres={genres}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          setPage={setPage}
          page={page}
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
                media_type="movie"
                vote_average={c.vote_average}
              />
            );
          })}
        {numberOfPages > 1 && (
          <CustomPagination setPage={setPage} Number_of_pages={numberOfPages} />
        )}
      </div>
    </>
  );
};

export default Movies;
