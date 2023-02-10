import React from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { applyCoupon, removeCoupon } from "../../actions/cart";

const DiscountArea = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);

  const formikFormData = useFormik({
    initialValues: {
      couponCode: "",
    },
    validationSchema: yup.object({
      couponCode: yup
        .string("Enter a valid coupon code")
        .required("Enter a valid coupon code"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      dispatch(applyCoupon(values.couponCode));
    },
  });

  const handleDelete = (couponId) => {
    dispatch(removeCoupon(couponId));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant='body2'
        fontWeight={"bold"}
        sx={{ color: "#6c727f" }}
      >
        Apply Discount Code
      </Typography>
      <Stack direction='row' spacing={2} sx={{ mt: 1 }}>
        <TextField
          sx={{ flexGrow: 1 }}
          variant='outlined'
          size='small'
          name='couponCode'
          onChange={formikFormData.handleChange}
          onBlur={formikFormData.handleBlur}
          value={formikFormData.values.couponCode}
          error={
            formikFormData.touched.couponCode &&
            Boolean(formikFormData.errors.couponCode || cartState.error)
          }
          helperText={
            (formikFormData.touched.couponCode &&
              formikFormData.errors.couponCode) ||
            cartState.error
          }
        />
        <Button
          variant='contained'
          sx={{
            height: 40,
            width: 100,
            textTransform: "none",
            bgcolor: "#4f48dd",
          }}
          onClick={formikFormData.handleSubmit}
        >
          Apply
        </Button>
      </Stack>
      {cartState.coupons.length !== 0 && (
        <Stack
          direction='row'
          // justifyContent='space-around'
          spacing={1}
          sx={{ mt: 1 }}
        >
          {cartState.coupons.map((item) => (
            <Chip
              label={item.code}
              key={item.id}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default DiscountArea;
