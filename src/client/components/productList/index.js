import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { useState } from "react";

import { productListSortMenuItems } from "../../Constants";
import ListHeader from "./ListHeader";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [sortMenuValue, setSortMenuValue] = useState(
    productListSortMenuItems.LAST_ADDED
  );
  const handleChange = (e) => {
    setSortMenuValue(e.target.value);
  };

  const productsPlaceholder = () => {
    let products = [];
    for (let i = 0; i < 6; i++) {
      products.push(
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={i}>
          <ProductCard />
        </Grid>
      );
    }
    return products;
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        // display: "flex",
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid xs={11} bgcolor='##f9fafb'>
        <ListHeader
          sortMenuValue={sortMenuValue}
          handleChange={handleChange}
        ></ListHeader>
        <Grid container spacing={2}>
          {productsPlaceholder()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductList;
