import { React, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { addProductFormFields } from "../../Constants";
import previewPlaceholder from "../../assets/image-preview-placeholder.jpg";
import { productObjPlaceholders } from "../../Constants";
import {
  getProduct,
  getProductList,
  updateProduct,
  addProduct,
  deleteProduct,
} from "../../actions/product";

const AddProduct = ({ isEditingProduct }) => {
  const navigate = useNavigate();

  let initialValues;
  let onSubmit;

  const { id } = useParams();

  const dispatch = useDispatch();
  // const productObj = useSelector((state) => state.productReducer.product);
  // const productObjJson = JSON.stringify(productObj);
  const productListObj = useSelector(
    (state) => state.productReducer.productList
  );
  const productListObjJson = JSON.stringify(productListObj);
  const isLoading = useSelector((state) => state.productReducer.isLoading);
  useEffect(() => {
    if (isEditingProduct) {
      // dispatch(getProduct(id));
      dispatch(getProductList());
    }
  }, [productListObjJson, dispatch]);

  const productObj = productListObj.find((obj) => obj._id === id);

  const newProductObj = useSelector(
    (state) => state.productReducer.product
  );

  if (isEditingProduct && !isLoading) {
    initialValues = {
      name: productObj.name,
      description: productObj.description,
      category: productObj.category,
      price: productObj.price,
      quantity: productObj.quantity,
      image_url: productObj.image_url,
    };

    onSubmit = (values) => {
      // console.log(values);
      dispatch(updateProduct(id, values));
      navigate(`/product/${id}`);
    };
  } else {
    initialValues = {
      name: "",
      description: "",
      category: addProductFormFields.CATEGORIES.CLOTHING,
      price: 0,
      quantity: 0,
      image_url: "",
    };
    onSubmit = async (values) => {
      // console.log(values);
      dispatch(addProduct(values));

      // navigate(`/product/${newProductObj._id}`);
      navigate("/");
    };
  }

  const formikFormData = useFormik({
    initialValues,
    onSubmit: (values) => onSubmit(values),
  });

  const [previewImage, setPreviewImage] = useState(
    formikFormData.values.image_url
      ? formikFormData.values.image_url
      : previewPlaceholder
  );

  if (isEditingProduct && isLoading) return <div>Loading...</div>;

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
                  name='category'
                  value={formikFormData.values.category}
                  onChange={formikFormData.handleChange}
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
                  height: 250,
                  backgroundSize: "contain",
                  border: "1px dashed #c4c4c4",
                }}
                image={previewImage}
              />
            </Grid2>

            <Grid2
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type='submit'
                variant='contained'
                sx={{
                  bgcolor: "#4f48dd",
                  color: "white",
                  height: 40,
                  textTransform: "none",
                  mr: 1,
                }}
                onClick={formikFormData.handleSubmit}
              >
                {isEditingProduct
                  ? addProductFormFields.UPDATE_PRODUCT
                  : addProductFormFields.ADD_PRODUCT}
              </Button>
              <Button
                variant='outlined'
                sx={{
                  // bgcolor: "#e15241",
                  // color: "white",
                  height: 40,
                  textTransform: "none",
                  mr: 1,
                }}
                onClick={() => navigate(-1)}
              >
                {addProductFormFields.CANCEL}
              </Button>

              {isEditingProduct && (
                <Button
                  variant='contained'
                  sx={{
                    bgcolor: "#e15241",
                    color: "white",
                    height: 40,
                    textTransform: "none",
                  }}
                  onClick={() => {
                    dispatch(deleteProduct(productObj._id));
                    navigate("/");
                  }}
                >
                  {addProductFormFields.DELETE_PRODUCT}
                </Button>
              )}
            </Grid2>
          </Grid2>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default AddProduct;
