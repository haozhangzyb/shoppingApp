import axios from "axios";

import {
  GET_PRODUCT_LIST,
  GET_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCT_ERROR,
  PRODUCT_LOADING_START,
  SET_SEARCH_INPUT,
} from "./types";

export const getProductList = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LOADING_START,
    });
    const res = await axios.get("/api/products");

    dispatch({
      type: GET_PRODUCT_LIST,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.response.data.errors);
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LOADING_START,
    });

    const res = await axios.get(`/api/products/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.response.data.errors);
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/products", formData);

    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });

    dispatch(getProductList());
  } catch (err) {
    console.error(err.response.data.errors);
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });

    dispatch(getProductList());
  } catch (err) {
    console.error(err.response.data.errors);
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const updateProduct = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/products/${id}`, formData);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });
    dispatch(getProductList());
  } catch (err) {
    console.error(err.response.data.errors);
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const setSearchInput = (e) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_INPUT,
    payload: e.target.value,
  });
};
