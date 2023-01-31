import React from "react";
import {
  Box,
  Button,
  CardMedia,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useNavigate, useParams } from "react-router-dom";
import AddToCartButton from "../productList/AddToCartButton";
import { useSelector, useDispatch } from "react-redux";

import previewPlaceholder from "../../assets/image-preview-placeholder.jpg";
import { productObjPlaceholders } from "../../Constants";
import ErrorPage from "../ErrorPage";
import { getProduct, deleteProduct } from "../../actions/product";
import { useEffect } from "react";

const ProductDetail = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { id } = useParams();
  // const productObj = productObjPlaceholders.find((obj) => obj._id === id);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const productObj = useSelector((state) => state.productReducer.product);
  const productObjJson = JSON.stringify(productObj);
  const isLoading = useSelector((state) => state.productReducer.isLoading);
  useEffect(() => {
    dispatch(getProduct(id));
  }, [productObjJson, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (!productObj) return <ErrorPage />;

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", width: "90%" }}>
      <Typography variant='h5'>Product Detail</Typography>
      <Grid2
        container
        sx={{
          mt: 2,
          p: 2,
          // height: "70vh",
          bgcolor: "white",
        }}
        spacing={4}
      >
        <Grid2 item xs={12} sm={6}>
          <CardMedia
            sx={{
              height: isSmallScreen ? "30vh" : "70vh",
              width: "100%",
              backgroundSize: "contain",
              border: "1px dashed #c4c4c4",
            }}
            image={productObj.image_url || previewPlaceholder}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6} pt={4}>
          <Typography variant='body1' color={"#6c727f"} mb={1}>
            {productObj.category}
          </Typography>
          <Typography variant='h5' color={"#535353"} mb={2}>
            {productObj.name}
          </Typography>
          <Typography variant='h5' mb={2}>
            ${productObj.price}
          </Typography>
          <Typography variant='body1' color={"#535353"} mb={5}>
            {productObj.description}
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <AddToCartButton
              sx={{ maxWidth: 100 }}
              productObj={productObj}
            />

            {isAuthenticated && (
              <Button
                variant='outlined'
                size='small'
                sx={{ textTransform: "none", width: 100 }}
                onClick={() => navigate(`/editProduct/${productObj._id}`)}
              >
                Edit
              </Button>
            )}
            {isAuthenticated && (
              <Button
                variant='contained'
                sx={{
                  bgcolor: "#e15241",
                  color: "white",
                  height: 40,
                  width: 100,
                  textTransform: "none",
                }}
                onClick={() => {
                  dispatch(deleteProduct(productObj._id));
                  navigate("/");
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ProductDetail;
