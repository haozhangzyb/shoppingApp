import React from "react";
import {
  Button,
  CardMedia,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import { useState } from "react";
import { useFormik } from "formik";

import { addProductFormFields } from "../../Constants";
import previewPlaceholder from "./image-preview-placeholder.jpg";

const AddProduct = () => {
  const [categoryValues, setCategoryValues] = useState(
    addProductFormFields.CATEGORIES.CLOTHING
  );

  const formikFormData = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      image_url: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [previewImage, setPreviewImage] = useState(previewPlaceholder);
  return (
    <Grid2 container justifyContent={"center"}>
      <Grid2 xs={11} maxWidth={700}>
        <Typography variant='h5'>Create Product</Typography>

        <Box sx={{ mt: 2, p: 4, bgcolor: "white" }}>
          <Grid2
            container
            spacing={2}
            justifyContent='center'
            type='form'
            onSubmit={formikFormData.handleSubmit}
          >
            <Grid2 item xs={12}>
              <Typography>{addProductFormFields.PRODUCT_NAME}</Typography>
              <TextField
                required
                fullWidth
                id='name'
                name='name'
                onChange={formikFormData.handleChange}
                onBlur={formikFormData.handleBlur}
                value={formikFormData.values.name}
              />
            </Grid2>

            <Grid2 item xs={12}>
              <Typography>
                {addProductFormFields.PRODUCT_DESCRIPTION}
              </Typography>
              <TextField
                required
                fullWidth
                id='description'
                name='description'
                multiline
                rows={3}
                onChange={formikFormData.handleChange}
                onBlur={formikFormData.handleBlur}
                value={formikFormData.values.description}
              />
            </Grid2>

            <Grid2 item xs={12} sm={6}>
              <Typography>{addProductFormFields.CATEGORY}</Typography>
              <FormControl
                sx={{
                  width: "100%",
                }}
              >
                <Select
                  id='demo-simple-select'
                  value={categoryValues}
                  onChange={(e) => setCategoryValues(e.target.value)}
                  sx={{
                    width: "100%",
                  }}
                >
                  <MenuItem
                    value={addProductFormFields.CATEGORIES.CLOTHING}
                  >
                    {addProductFormFields.CATEGORIES.CLOTHING}
                  </MenuItem>
                  <MenuItem
                    value={addProductFormFields.CATEGORIES.ELECTRONICS}
                  >
                    {addProductFormFields.CATEGORIES.ELECTRONICS}
                  </MenuItem>
                  <MenuItem value={addProductFormFields.CATEGORIES.HOME}>
                    {addProductFormFields.CATEGORIES.HOME}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 item xs={12} sm={6}>
              <Typography>{addProductFormFields.PRICE}</Typography>
              <TextField
                type={"number"}
                required
                fullWidth
                id='price'
                name='price'
                onChange={formikFormData.handleChange}
                onBlur={formikFormData.handleBlur}
                value={formikFormData.values.price}
              />
            </Grid2>

            <Grid2 item xs={12} sm={4}>
              <Typography>
                {addProductFormFields.IN_STOCK_QUANTITY}
              </Typography>
              <TextField
                type={"number"}
                required
                fullWidth
                id='quantity'
                name='quantity'
                onChange={formikFormData.handleChange}
                onBlur={formikFormData.handleBlur}
                value={formikFormData.values.quantity}
              />
            </Grid2>
            <Grid2 item xs={12} sm={8}>
              <Typography>
                {addProductFormFields.ADD_IMAGE_LINK}
              </Typography>
              <OutlinedInput
                required
                fullWidth
                id='image_url'
                name='image_url'
                endAdornment={
                  <InputAdornment position='end'>
                    <Button
                      variant='contained'
                      sx={{
                        bgcolor: "#4f48dd",
                        color: "white",
                        textTransform: "none",
                      }}
                      onClick={() => {
                        setPreviewImage(formikFormData.values.image_url);
                      }}
                    >
                      Upload
                    </Button>
                  </InputAdornment>
                }
                onChange={formikFormData.handleChange}
                onBlur={formikFormData.handleBlur}
                value={formikFormData.values.image_url}
              />
            </Grid2>
            <Grid2 item xs={12} sm={9}>
              <CardMedia
                sx={{
                  height: 200,
                }}
                image={previewImage}
              />
            </Grid2>

            <Grid2 item xs={12}>
              <Button
                type='submit'
                variant='contained'
                sx={{
                  bgcolor: "#4f48dd",
                  color: "white",
                  height: 40,
                  textTransform: "none",
                }}
                onClick={formikFormData.handleSubmit}
              >
                {addProductFormFields.ADD_PRODUCT}
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default AddProduct;
