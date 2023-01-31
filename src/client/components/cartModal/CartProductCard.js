import React from "react";
import { Box, CardMedia, Link, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import previewPlaceholder from "../../assets/image-preview-placeholder.jpg";
import AddToCartButton from "../productList/AddToCartButton";
import { removeAllFromCart } from "../../actions/cart";
import { closeCartModal } from "../../actions/cartModal";

const CartProductCard = ({ productObj }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickToProductDetail = () => {
    navigate(`/products/${productObj._id}`);
    dispatch(closeCartModal());
  };
  return (
    <Box sx={{ display: "flex", my: 2 }}>
      <CardMedia
        sx={{
          height: 100,
          width: 100,
          backgroundSize: "contain",
          border: "1px dashed #c4c4c4",
        }}
        image={productObj.image_url || previewPlaceholder}
        onClick={onClickToProductDetail}
      />

      <Box
        sx={{
          ml: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
          onClick={onClickToProductDetail}
        >
          <Typography variant='h7'> {productObj.name} </Typography>
          <Typography variant='h7' color='#4f48dd'>
            {" "}
            ${productObj.price * productObj.inCartQuantity}{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <AddToCartButton
            sx={{ bgcolor: "white", color: "black", maxWidth: 100 }}
            productObj={productObj}
          />
          <Typography
            variant='h7'
            color='#6c727f'
            sx={{ textDecoration: "underline", my: "auto" }}
            onClick={() => dispatch(removeAllFromCart(productObj._id))}
          >
            Remove
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartProductCard;
