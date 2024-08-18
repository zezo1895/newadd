

import Drawer from "@mui/material/Drawer";


import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";



import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LocalGroceryStoreTwoToneIcon from "@mui/icons-material/LocalGroceryStoreTwoTone";

import { useTheme } from "@emotion/react";

import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";


const drawerWidth = 240;



const Drawerr = ({ setmode, show, type, settype, setshow }) => {
  const theme = useTheme();
  const location = useLocation();
  const nav = useNavigate();



  const { newadd } = useSelector((state) => state.cartt);
  const StyledBadge =
  styled(Badge) 
  
  (() => ({
  
    "& .MuiBadge-badge": {
      top: 15,
      backgroundColor: `${theme.palette.stander.main}`,
      color: "#fff"
    },
  }));
  
  const dradetails = [
    {
      key: 1,
      text: "Home",
      icon: <HomeTwoToneIcon />,
      link: "/",
    },
    {
      key: 2,
      text: "Cart",
      icon: (
        <StyledBadge  badgeContent={newadd.length===0? "0":newadd.length} color="secondary">
          <LocalGroceryStoreTwoToneIcon />
        </StyledBadge>
      ),
      link: "/cart",
    },
  ];

  return (
    <Drawer
      sx={{
        width: `${drawerWidth}px`,
        display: { xs: show, sm: "block" },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant={type}
      anchor="left"
      open={true}
      onClose={() => {
        settype("permanent");
        setshow("none");
      }}
    >
      {/* <IconButton onClick={() => {
      setmode(theme.palette.mode === "dark"?"light":"dark")
    }}>
    <Brightness4Icon/>
    </IconButton> */}

      {/* sx={{
        // display: 'flex',
      
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
      
      }} */}

      <List>
        <ListItem
          sx={{
            display: "flex",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <IconButton
            sx={{
              ml: 1,
              bgcolor: "background.default",
              color: "text.primary",
              borderRadius: 5,
            }}
            onClick={() => {
              localStorage.setItem(
                "theme",
                theme.palette.mode === "dark" ? "light" : "dark"
              );
              setmode(theme.palette.mode === "dark" ? "light" : "dark");
            }}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon sx={{ color: "orange" }} />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </ListItem>

        <Divider />

        {dradetails.map((item, index) => (
          <ListItem
            sx={{
              backgroundColor:
                location.pathname === item.link
                  ? theme.palette.stander.main
                  : null,
            }}
            key={item.key}
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                nav(`${item.link}`);
                // if(item.link===location.pathname){
                //   setactive(true)
                //   console.log(location.pathname)
                // }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText color="primary" primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Drawerr;
