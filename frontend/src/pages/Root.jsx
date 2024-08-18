import React, { useState } from "react";
import "./home/home.css";
import { Outlet } from "react-router-dom";
import Appbar from "../comp/appbar";
import Drawerr from "../comp/drawer";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import getDesignTokens from "../comp/style";

const Root = () => {
  const [mode, setmode] = useState(
    localStorage.getItem("theme") === null
      ? "dark"
      : localStorage.getItem("theme") === "light"
      ? "light"
      : "dark"
  );
  const [show, setshow] = useState("none");
  const [type, settype] = useState("permanent");

  const darkTheme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Appbar settype={settype} setshow={setshow} />

        <Drawerr setshow={setshow} settype={settype} type={type} setmode={setmode} show={show} />

        <CssBaseline />
        <Box
          sx={{
            marginLeft: { xs: "0px", sm: "240px" },
            
            display: "flex",
            justifyContent: "center",
            mt: "66px",  
          }}
        >
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Root;
