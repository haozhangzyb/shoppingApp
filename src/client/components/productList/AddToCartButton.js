import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";

import { useSelector, useDispatch } from "react-redux";

import {
  addToCart,
  removeOneFromCart,
  removeAllFromCart,
} from "../../actions/cart";

const AddToCartButton = ({ sx, productObj }) => {
  const cartState = useSelector((state) => state.cartReducer);
  const itemInCart = cartState.products.find(
    (item) => item._id == productObj._id
  );
  const inCartQuantity = itemInCart ? itemInCart.inCartQuantity : 0;

  const dispatch = useDispatch();

  const removeItemHandler = () => {
    if (inCartQuantity > 1) {
      dispatch(removeOneFromCart(productObj));
    } else if (inCartQuantity === 1) {
      dispatch(removeAllFromCart(productObj));
    }
  };

  const addItemHandler = () => {
    dispatch(addToCart(productObj));
  };

  return (
    <ButtonGroup
      variant='contained'
      aria-label='outlined primary button group'
      size='small'
      sx={{
        width: "48%",
        ...sx,
        bgcolor: "#4f48dd",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button
        sx={{
          bgcolor: "#4f48dd",
          borderStyle: "none !important",
        }}
        onClick={removeItemHandler}
      >
        -
      </Button>
      <Typography
        sx={{
          my: "auto",
          fontSize: 12,
        }}
      >
        {inCartQuantity}
      </Typography>
      <Button
        sx={{
          bgcolor: "#4f48dd",
        }}
        onClick={addItemHandler}
      >
        +
      </Button>
    </ButtonGroup>
  );
};

export default AddToCartButton;
