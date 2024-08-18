import "./cart.css";

import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useDispatch, useSelector } from "react-redux";

import {
  decrementByAmount,
  deletee,
  incrementByAmount,
} from "../../Redux/productsSlice";

const Cart = () => {
  const themee = useTheme();

  const { newadd } = useSelector((state) => state.cartt);
  const dispatch = useDispatch();
  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      top: 20,
      backgroundColor: `${themee.palette.stander.main}`,
      color: "#fff",
    },
  }));

  let sub = 0;
  return (
    <Box
      sx={{
        overflow: "none",

        width: { md: "80%", sm: "90%", xs: "90%" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {newadd.map((item) => {
        sub += item.price * item.quant;
        return (
          <Paper
            sx={{
              minWidth: "80%",
              maxHeight: "100px",
              overflow: "none",
              boxShadow: "0 5px 30px 0 rgb(0 0 0 /15%)",
              display: "flex",
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "space-around",
              borderRadius: "8px",
              borderTop: `6px solid ${themee.palette.stander.main}`,
              gap: "10px",
              mb: 5,
            }}
          >
            <Button
              sx={{ display: { md: "block", xs: "none" } }}
              variant="text"
              color="error"
              onClick={() => {
                dispatch(deletee(item));
              }}
            >
              Delete
            </Button>
            <IconButton
              onClick={() => {
                dispatch(deletee(item));
              }}
              sx={{ display: { md: "none", xs: "block" } }}
              color="error"
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            <Typography variant="div" color="#000">
              {item.price * item.quant}
            </Typography>
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
                badgeContent={item.quant}
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
            <Typography sx={{ alignContent: "center" }} color="#000">
              {item.productName}
            </Typography>
            <div className="Image-det">
              <img src={item.imageLink[0]} alt="" />
            </div>
          </Paper>
        );
      })}
      <Paper sx={{ width: "250px" }}>
        <Typography align="center" variant="h6" sx={{ p: 1 }}>
          Cart Summery
        </Typography>
        <Divider fullwidth />
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <Typography variant="div">Subtotal</Typography>
          <Typography variant="div">${sub}</Typography>
        </Box>
        <Button variant="contained" fullWidth>
          checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
