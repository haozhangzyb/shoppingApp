import React from "react";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

const DiscountArea = () => {
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
      console.log(values);
    },
  });

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
            Boolean(formikFormData.errors.couponCode)
          }
          helperText={
            formikFormData.touched.couponCode &&
            formikFormData.errors.couponCode
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
    </Box>
  );
};

export default DiscountArea;
