import axios from "axios";

import { addAlert } from "./alert";
import { AlertTypes } from "../Constants";

import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CART_ERROR,
  CLEAR_LOCAL_CART,
} from "./types";

export const getCart = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cart");

    dispatch({
      type: GET_CART,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.response.data);

    const errors = err.response.data.errors;

    if (errors) {
      dispatch({
        type: CART_ERROR,
        payload: err.response.data.errors,
      });

      errors.forEach((error) =>
        dispatch(addAlert(error.msg, AlertTypes.INFO))
      );
    }
  }
};

export const addToCart = (productId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/cart/`, { productId });

    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.response.data);

    const errors = err.response.data.errors;

    if (errors) {
      dispatch({
        type: CART_ERROR,
        payload: err.response.data.errors,
      });

      errors.forEach((error) =>
        dispatch(addAlert(error.msg, AlertTypes.INFO))
      );
    }
  }
};

export const removeOneFromCart = (productId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/cart/`, { productId });

    dispatch({
      type: REMOVE_ONE_FROM_CART,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.response.data);

    const errors = err.response.data.errors;
    if (errors) {
      dispatch({
        type: CART_ERROR,
        payload: err.response.data.errors,
      });

      errors.forEach((error) =>
        dispatch(addAlert(error.msg, AlertTypes.INFO))
      );
    }
  }
};

export const removeAllFromCart = (productId) => async (dispatch) => {
  try {
    // delete do not have a header, so need to use data to add header
    const res = await axios.delete(`/api/cart/`, { data: { productId } });

    dispatch({
      type: REMOVE_ALL_FROM_CART,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.response.data);

    const errors = err.response.data.errors;
    if (errors) {
      dispatch({
        type: CART_ERROR,
        payload: err.response.data.errors,
      });

      errors.forEach((error) =>
        dispatch(addAlert(error.msg, AlertTypes.INFO))
      );
    }
  }
};

export const clearLocalCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_LOCAL_CART,
  });
};
