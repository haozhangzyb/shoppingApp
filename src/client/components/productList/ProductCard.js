import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";

import AddToCartButton from "./AddToCartButton";
import previewPlaceholder from "./image-preview-placeholder.jpg";

const ProductCard = ({ productObj }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        // maxWidth: 250,
        width: "100%",
        border: "1px solid #cccccc",
        borderRadius: "5px",
      }}
    >
      <CardMedia
        sx={{ height: 200, mx: 1, mt: 1, backgroundSize: "contain" }}
        // image='https://mui.com/static/images/cards/contemplative-reptile.jpg'
        image={productObj.image_url || previewPlaceholder}
        onClick={() => navigate(`/product/${productObj._id}`)}
      />
      <CardContent onClick={() => navigate(`/product/${productObj._id}`)}>
        <Typography variant='body' color='text.secondary'>
          {productObj.name}
        </Typography>
        <Typography variant='body' component='div'>
          ${productObj.price}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <AddToCartButton inCartNumber={1} />
        <Button
          variant='contained'
          sx={{ bgcolor: "#4f48dd", width: "48%" }}
          size='small'
          onClick={() => navigate(`/editProduct/${productObj._id}`)}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
