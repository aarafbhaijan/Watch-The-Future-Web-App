import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import TvIcon from "@mui/icons-material/Tv";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Trending from "./Trending/Trending";
import Series from "./Series/Series";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();


  return (
    <Box sx={{ width: '100vw' }}>
      <BottomNavigation
        style={{
          backgroundColor: "#1A1A40",
          boxShadow: "0 0 15px #8758ff",
          width: "100vw",
          position: "fixed",
          bottom: "0",
          zIndex:100
        }}
        showLabels
        value={value}
        onChange={(event, value) => {
          if (value === 0) {
            setValue(value)
            navigate("/");
          } else if (value === 1) {
            setValue(value)
            navigate("/movies");
          } else if (value === 2) {
            setValue(value)
            navigate("/series");
          } else if (value === 3) {
            setValue(value)
            navigate("/search");
          }
        }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Trending"
          icon={<WhatshotIcon />}
          onClick={()=>window.scroll(0,0)}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieIcon />}
          onClick={()=>window.scroll(0,0)}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="TV Series"
          icon={<TvIcon/>}
         onClick={()=>window.scroll(0,0)}/>
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
          onClick={()=>window.scroll(0,0)}
        />
      </BottomNavigation>
    </Box>
  );
}
