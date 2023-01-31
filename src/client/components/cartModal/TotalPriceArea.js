import React from "react";
import { Box, Stack, Typography } from "@mui/material";

function PriceStack(props) {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      sx={{
        mt: 1,
      }}
    >
      <Typography variant='h7' fontWeight={"bold"}>
        {props.title}
      </Typography>
      <Typography variant='h7' fontWeight={"bold"}>
        ${props.price}
      </Typography>
    </Stack>
  );
}

const TotalPriceArea = ({ cartState }) => {
  return (
    <Box sx={{ mt: 3 }}>
      {PriceStack({ title: "Subtotal", price: cartState.subtotal })}
      {PriceStack({ title: "Tax", price: cartState.tax })}
      {PriceStack({ title: "Discount", price: cartState.discount })}
      {PriceStack({ title: "Estimated Total", price: cartState.total })}
    </Box>
  );
};

export default TotalPriceArea;
