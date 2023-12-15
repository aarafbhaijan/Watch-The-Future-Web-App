import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import SingleContent from "../SingleContent/SingleContent.jsx";
import CustomPagination from "../CustomPagination/CustomPagination.jsx";
import "./Search.css";

const Search = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const [type, setType] = useState(0);
  let [seachText, setSeachText] = useState("war");
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const api_key = "f3ffd8d11a71057c55ed885f5cfe4edb";
  const url = `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?
              api_key=${api_key}&language=en-US&query=${seachText}&page=${page}&include_adult=false`;
  const nUrl = `https://api.themoviedb.org/3/search/${
    type ? "tv" : "movie"
  }?api_key=${api_key}&language=en-US&query=${seachText}&page=${page}&include_adult=false`;

  const fetchSearch = async () => {
    const { data } = await axios.get(nUrl);
    // console.log(data);

    try{setContent(data.results);
    setNumberOfPages(data.total_pages);
    console.log(type);}catch{
      setError(data.error.message)
    }
   };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [page, type]);
  if(seachText===''){
    setSeachText(seachText='war')
  }

  return (
     (!content && setLoading(loading(true)))?(
      <div>Loading...</div>
    ):(<>
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex",
            margin: "15px ,0",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchSearch();
            }}
          >
            <TextField
              style={{ minWidth: "30vw" }}
              id="filled-basic"
              label="Search.."
              variant="filled"
              onChange={(e) => setSeachText(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ marginLeft: 10 ,padding:'15px'}}
              type="submit"
            >
              <SearchIcon />
            </Button>
          </form>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tabs
            textColor="primary"
            value={type}
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="basic tabs example"
          >
            <Tab label="Search For Movies" />
            <Tab label="Search For Tv-Series" />
          </Tabs>
        </div>
      </ThemeProvider>
      <div className="search">
        {content &&
          content.map((c) => {
            return (
              <SingleContent
                id={c.id}
                key={c.id}
                title={c.title || c.name}
                poster={c.poster_path}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            );
          })}

        {!seachText &&
          (type ? (
            <h1>No Series Searched...</h1>
          ) : (
            <h1>No Movies Searched...</h1>
          ))}
        {seachText &&
          !content.length &&
          (type ? <h1>No Series Found!</h1> : <h1>No Movie Found!</h1>)}

        {numberOfPages > 1 && (
          <CustomPagination setPage={setPage} Number_of_pages={numberOfPages} />
        )}
      </div>
    </>)
  );
};

export default Search;
