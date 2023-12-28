import React from "react";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const CustomPagination = ({ setPage, Number_of_pages = 10 }) => {
  const themeDark = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={themeDark}>
        <Pagination
          // sx={{
          //   ".css-1jhmdt8-MuiButtonBase-root-MuiPaginationItem-root":{
          //       color: 'white',
          //       border: '0.1px solid #fff',
          //   },
          //   ".css-1jhmdt8-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":{
          //       color: 'white',
          //       border: '3px solid #8758ff',
          //   },

          // }}
          size="large"
          hideNextButton
          hidePrevButton
          color="secondary"
          count={Number_of_pages}
          variant="outlined"
          shape="rounded"
          onChange={(e) => {
            setPage(e.target.textContent);
            window.scroll(0, 0);
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
