import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';


import pic from "../pic/photo_2024-04-25_03-01-30.jpg";
import { Avatar, IconButton, useTheme } from "@mui/material";

const Appbar = ({setshow,settype}) => {
  const themee = useTheme();
  
  return (
    <div>
      <Box sx={{ flexGrow: 1, marginLeft: { xs: "0px", sm: "240px" } }}>
        <AppBar
          sx={{ background: themee.palette.stander.main }}
          position="static"
        >
          <Toolbar>
            <IconButton onClick={() => {
              settype("temporary")
              setshow("block")
              
            }
            } aria-label="Menu" sx={{ display:{xs:"block",sm:"none"} }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                transition: ".5s",
                "&:hover": { fontSize: "25px", transition: ".5s" },
              }}
            >
              Online Store
            </Typography>
            <Button  variant="outlined" color="inherit">
              Weza
            </Button>
            <Avatar sx={{ marginLeft: "5px" }} alt="Remy Sharp" src={pic} />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Appbar;
