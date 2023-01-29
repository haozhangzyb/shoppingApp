import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { useState } from "react";

import { productListSortMenuItems } from "../../Constants";
import ListHeader from "./ListHeader";
import ProductCard from "./ProductCard";

import { productObjPlaceholders } from "../../Constants";

const ProductList = () => {
  const [sortMenuValue, setSortMenuValue] = useState(
    productListSortMenuItems.LAST_ADDED
  );

  const productsPlaceholder = () => {
    let sortedProducts;
    if (sortMenuValue === productListSortMenuItems.PRICE_HIGH_TO_LOW) {
      sortedProducts = productObjPlaceholders.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (
      sortMenuValue === productListSortMenuItems.PRICE_LOW_TO_HIGH
    ) {
      sortedProducts = productObjPlaceholders.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortMenuValue === productListSortMenuItems.LAST_ADDED) {
      sortedProducts = productObjPlaceholders.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    }

    return sortedProducts.map((productObj) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={productObj.id}>
          <ProductCard productObj={productObj} />
        </Grid>
      );
    });
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
      <Grid xs={11}>
        <ListHeader
          sortMenuValue={sortMenuValue}
          handleChange={(e) => setSortMenuValue(e.target.value)}
        ></ListHeader>
        <Grid container spacing={2}>
          {productsPlaceholder()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductList;
