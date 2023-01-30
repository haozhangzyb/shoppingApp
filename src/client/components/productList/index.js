import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productListSortMenuItems } from "../../Constants";
import ListHeader from "./ListHeader";
import ProductCard from "./ProductCard";

import { productObjPlaceholders } from "../../Constants";
import { getProductList } from "../../actions/product";
import { useEffect } from "react";
import { useMemo } from "react";

const ProductList = () => {
  const [sortMenuValue, setSortMenuValue] = useState(
    productListSortMenuItems.LAST_ADDED
  );

  let productList = useSelector(
    (state) => state.productReducer.productList
  );
  // productList = useMemo(() => productList);
  const productListJson = JSON.stringify(productList);
  const isLoading = useSelector((state) => state.productReducer.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductList());
  }, [productListJson, dispatch]);

  const productsPlaceholder = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    let sortedProducts;
    if (sortMenuValue === productListSortMenuItems.PRICE_HIGH_TO_LOW) {
      sortedProducts = productList.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (
      sortMenuValue === productListSortMenuItems.PRICE_LOW_TO_HIGH
    ) {
      sortedProducts = productList.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortMenuValue === productListSortMenuItems.LAST_ADDED) {
      sortedProducts = productList.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    return sortedProducts.map((productObj) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={productObj._id}>
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
