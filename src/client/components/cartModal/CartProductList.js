import React from "react";
import { Typography } from "@mui/material";

import CartProductCard from "./CartProductCard";

const CartProductList = ({ cartState }) =>
  cartState.products.length > 0 ? (
    cartState.products.map((item) => {
      // if (item.inCartQuantity > 0)
      return <CartProductCard key={item._id} productObj={item} />;
    })
  ) : (
    <Typography variant='h6' sx={{ textAlign: "center" }}>
      Your cart is empty
    </Typography>
  );

export default CartProductList;
