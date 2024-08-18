import React, { useRef, useState } from "react";
import { useGetoneproductQuery } from "../../Redux/productsAPI";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  styled,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import DetailsThumb from "./DetailsThumb";
import "./product-details.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  decrementByAmount,
  incrementByAmount,
} from "../../Redux/productsSlice";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import LocalGroceryStoreTwoToneIcon from "@mui/icons-material/LocalGroceryStoreTwoTone";

const Details = () => {
  let { id } = useParams();
  const { data, isLoading } = useGetoneproductQuery(id);
  const [index, setindex] = useState(0);
  const myRef = useRef(null);
  const dispatch = useDispatch();
  const { aboutid, newadd } = useSelector((state) => state.cartt);
  const themee = useTheme();

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      top: 15,
      backgroundColor: `${themee.palette.stander.main}`,
      color: "#fff",
    },
  }));
  const showquant = (datam) => {
    const product = newadd.find((iduserdata) => {
      return iduserdata.id === datam.id;
    });

    return product.quant;
  };

  const handleTab = (index) => {
    // this.setState({index: index})
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
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
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>
            {/* <Colors colors={data.colors} /> */}

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {aboutid.includes(data.id) ? (
              <Box display={"flex"}>
                <IconButton
                  onClick={() => {
                    dispatch(incrementByAmount(data));
                  }}
                  sx={{ color: `${themee.palette.stander.main}` }}
                >
                  {" "}
                  <AddOutlinedIcon />
                </IconButton>

                <StyledBadge
                  sx={{ margin: "5px 8px" }}
                  badgeContent={showquant(data)}
                  color="secondary"
                />

                <IconButton
                  onClick={() => {
                    dispatch(decrementByAmount(data));
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
                  dispatch(addtocart(data));
                }}
              >
                <LocalGroceryStoreTwoToneIcon />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
