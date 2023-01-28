import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import ButtonGroup from "@mui/material/ButtonGroup";

import AddToCartButton from "./AddToCartButton";

// function AddToCartButton() {
//   return (
//     <ButtonGroup
//       variant='contained'
//       aria-label='outlined primary button group'
//       size='small'
//       sx={{
//         bgcolor: "#4f48dd",
//         color: "white",
//         width: "48%",
//         display: "flex",
//         justifyContent: "space-between",
//       }}
//     >
//       <Button
//         sx={{
//           bgcolor: "#4f48dd",
//           borderStyle: "none !important",
//         }}
//       >
//         -
//       </Button>
//       <Typography
//         sx={{
//           my: "auto",
//         }}
//       >
//         1
//       </Typography>
//       <Button
//         sx={{
//           bgcolor: "#4f48dd",
//         }}
//       >
//         +
//       </Button>
//     </ButtonGroup>
//   );
// }

const ProductCard = () => {
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
        sx={{ height: 200, mx: 1, mt: 1 }}
        // image='/static/images/cards/contemplative-reptile.jpg'
        image='https://mui.com/static/images/cards/contemplative-reptile.jpg'
      />
      <CardContent>
        <Typography variant='body' color='text.secondary'>
          Phone
        </Typography>
        <Typography variant='body' component='div'>
          $499.99
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <AddToCartButton />
        <Button
          variant='contained'
          sx={{ bgcolor: "#4f48dd", width: "48%" }}
          size='small'
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
