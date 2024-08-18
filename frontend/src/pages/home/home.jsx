import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import Typography from "@mui/material/Typography";

import { useGetproductsByNameQuery } from "../../Redux/productsAPI";

import CircularProgress from "@mui/material/CircularProgress";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

import { Badge, Box, Button, IconButton, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  decrementByAmount,
  incrementByAmount,
} from "../../Redux/productsSlice";
import { useNavigate } from "react-router-dom";
import LocalGroceryStoreTwoToneIcon from "@mui/icons-material/LocalGroceryStoreTwoTone";

const Home = () => {
  const themee = useTheme();
  const { data, isLoading } = useGetproductsByNameQuery();
  const { aboutid, newadd } = useSelector((state) => state.cartt);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      top: 20,
      backgroundColor: `${themee.palette.stander.main}`,
      color: "#fff",
    },
  }));
  const showquant = (itemm) => {
    const product = newadd.find((iduseritem) => {
      return iduseritem.id === itemm.id;
    });

    return product.quant;
  };
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (data) {
    return (
      <Stack
        direction={"row"}
        sx={{
          width: { sm: "50%", xs: "80%", md: "100%" },
          padding: "15px",
          flexWrap: "wrap",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {data.map((item) => {
          return (
            <Card className="card" sx={{ maxWidth: 350, pb: 1 }} key={item.id}>
              <CardMedia
                component="img"
                height="400"
                image={item.imageLink[0]}
                alt="Paella weza"
                onClick={() => {
                  nav(`/details/${item.id}`);
                }}
              />
              <CardContent>
                <Typography variant="h6">{item.productName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                {aboutid.includes(item.id) ? (
                  <Box display={"flex"}>
                    <IconButton
                      onClick={() => {
                        dispatch(incrementByAmount(item));
                      }}
                      sx={{ color: `${themee.palette.stander.main}` }}
                    >
                      {" "}
                      <AddOutlinedIcon />
                    </IconButton>

                    <StyledBadge
                      sx={{ margin: "0 5px" }}
                      badgeContent={showquant(item)}
                      color="secondary"
                    />

                    <IconButton
                      onClick={() => {
                        dispatch(decrementByAmount(item));
                      }}
                      sx={{ color: `${themee.palette.stander.main}` }}
                    >
                      {" "}
                      <RemoveOutlinedIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    sx={{
                      p: 1.2,
                      lineHeight: 1.1,
                      textTransform: "none",
                      backgroundColor: `${themee.palette.stander.main}`,
                    }}
                    variant="contained"
                    onClick={() => {
                      dispatch(addtocart(item));
                    }}
                  >
                    <LocalGroceryStoreTwoToneIcon />
                    Add to Cart
                  </Button>
                )}
                <Typography
                  variant="div"
                  color={`${themee.palette.error.light}`}
                >
                  ${item.price}
                </Typography>
              </CardActions>
              <Collapse timeout="auto" unmountOnExit>
                <CardContent></CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
