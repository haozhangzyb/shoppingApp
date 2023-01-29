import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";

const AddToCartButton = ({ sx, inCartNumber }) => {
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
      >
        -
      </Button>
      <Typography
        sx={{
          my: "auto",
        }}
      >
        {inCartNumber}
      </Typography>
      <Button
        sx={{
          bgcolor: "#4f48dd",
        }}
      >
        +
      </Button>
    </ButtonGroup>
  );
};

export default AddToCartButton;
