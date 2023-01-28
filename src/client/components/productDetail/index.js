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
import React from "react";
import { useParams } from "react-router-dom";
import AddToCartButton from "../productList/AddToCartButton";

import previewPlaceholder from "../productList/image-preview-placeholder.jpg";

const ProductDetail = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { id } = useParams();
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
            image={previewPlaceholder}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6} pt={4}>
          <Typography variant='body1' color={"#6c727f"} mb={1}>
            Category
          </Typography>
          <Typography variant='h5' color={"#535353"} mb={2}>
            Meta Quest2 VR headset
          </Typography>
          <Typography variant='h5' mb={2}>
            $299
          </Typography>
          <Typography variant='body1' color={"#535353"} mb={5}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            aspernatur ipsa quos ex, quisquam laborum molestias quae id vel
            sequi voluptas repudiandae sed obcaecati minima similique
            voluptatum dolores aliquid deserunt.
          </Typography>
          {/* <Button
            variant='contained'
            sx={{ mr: 3, textTransform: "none", bgcolor: "#4f48dd" }}
          >
            Add to cart
          </Button> */}
          <Stack direction={"row"} spacing={2}>
            <AddToCartButton sx={{ maxWidth: 100 }} />
            <Button
              variant='outlined'
              size='small'
              sx={{ textTransform: "none", width: 100 }}
            >
              Edit
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ProductDetail;
