import axios from "axios";
import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import { green } from "@mui/material/colors";
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';


const Genres = ({
  type,
  page,
  setPage,
  genres,
  setGenres,
  setSelectedGenres,
  selectedGenres,
}) => {
  const themeDark=createTheme({
    palette:{
      mode:'dark',
      primary:{
        text:'white',
        main:'#fff'
      }
    }
  })
  
  const api_key = "f3ffd8d11a71057c55ed885f5cfe4edb";
  const url=`https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=en-US`
  

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove=(genre)=>{
    setSelectedGenres(selectedGenres.filter((selected)=>selected.id !==genre.id))
    setGenres([...genres,genre])
    setPage(1)
  }
  const fetchGenres = async () => {
    const { data } = await axios.get(url);
    setGenres(data.genres);
    
  };

  useEffect(() => {
    fetchGenres();
    // react-hooks/exhaustive-deps 
    return setGenres({});
    // react-hooks/exhaustive-deps 
  }, [page]);
  return (
    <>
      <div style={{ padding: "6px 0" }}>
        {selectedGenres && Object.values(selectedGenres).map((genre) => (
            <Chip
              label={genre.name}
              color="primary"
              clickable
              key={genre.id}
              style={{ margin: "2px" }}
              
              onDelete={()=>handleRemove(genre)}
              // sx={{".css-zs46iz-MuiButtonBase-root-MuiChip-root":{
              //   backgroundColor:'white'
              // }}}
            />
          ))}
        {genres &&
          Object.values(genres).map((genre) => (
            <ThemeProvider theme={themeDark}>
            <Chip
              label={genre.name}
              clickable
              key={genre.id}
              style={{ margin: "2px" }}
              onClick={() => handleAdd(genre)}
              
            />
            </ThemeProvider>
          ))}
      </div>
    </>
  );
};

export default Genres;
