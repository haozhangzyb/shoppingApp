import axios from "axios";

import { addAlert } from "./alert";
import { AlertTypes } from "../Constants";
import store from "../store";

import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CART_ERROR,
  CLEAR_LOCAL_CART,
  APPLY_COUPON,
  REMOVE_COUPON,
  CLEAR_CART_ERRORS,
  GET_LOCAL_CART,
  SYNC_LOCAL_CART,
} from "./types";

const handleErrors =
  (err, isToAddToAlert = false, isToAddToCartState = false) =>
  async (dispatch) => {
    console.error(err);

    if (err.response.data.errors) {
      const errors = err.response.data.errors;

      if (isToAddToAlert) {
        errors.forEach((error) =>
          dispatch(addAlert(error.msg, AlertTypes.INFO))
        );
      }

      if (isToAddToCartState) {
        dispatch({
          type: CART_ERROR,
          payload: err.response.data.errors
            .map((error) => error.msg)
            .join(","),
        });

        setTimeout(() => {
          clearCartErrors()(dispatch);
        }, 2000);
      }
    }
  };

export const getCart = () => async (dispatch) => {
  const isAuthenticated = store.getState().authReducer.isAuthenticated;
  if (!isAuthenticated) {
    getLocalCart()(dispatch);
    return;
  }

  try {
    const res = await axios.get("/api/cart");

    dispatch({
      type: GET_CART,
      payload: res.data,
    });
  } catch (err) {
    handleErrors(err, true, false)(dispatch);
  }
};

export const addToCart = (productId) => async (dispatch) => {
  const isAuthenticated = store.getState().authReducer.isAuthenticated;
  if (!isAuthenticated) {
    dispatch(addToLocalCart(productId));
    return;
  }

  try {
    const res = await axios.post(`/api/cart/`, { productId });

    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });

    dispatch(getCart());
  } catch (err) {
    handleErrors(err, true, false)(dispatch);
  }
};

export const removeOneFromCart = (productId) => async (dispatch) => {
  const isAuthenticated = store.getState().authReducer.isAuthenticated;
  if (!isAuthenticated) {
    dispatch(removeOneFromLocalCart(productId));
    return;
  }
  try {
    const res = await axios.put(`/api/cart/`, { productId });

    dispatch({
      type: REMOVE_ONE_FROM_CART,
      payload: res.data,
    });

    dispatch(getCart());
  } catch (err) {
    handleErrors(err, true, false)(dispatch);
  }
};

export const removeAllFromCart = (productId) => async (dispatch) => {
  const isAuthenticated = store.getState().authReducer.isAuthenticated;
  if (!isAuthenticated) {
    console.log("removeAllFromLocalCart");
    removeAllFromLocalCart(productId)(dispatch);
    return;
  }

  try {
    // delete do not have a header, so need to use data to add header
    const res = await axios.delete(`/api/cart/`, { data: { productId } });

    dispatch({
      type: REMOVE_ALL_FROM_CART,
      payload: res.data,
    });

    dispatch(getCart());
  } catch (err) {
    handleErrors(err, true, false)(dispatch);
  }
};

export const clearLocalCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_LOCAL_CART,
  });

  dispatch(getCart());
};

export const applyCoupon = (coupon) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/cart/coupon`, { coupon });

    dispatch({
      type: APPLY_COUPON,
      payload: res.data,
    });

    dispatch(getCart());
  } catch (err) {
    handleErrors(err, true, true)(dispatch);
  }
};

export const removeCoupon = (couponId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/cart/coupon`, {
      data: { couponId },
    });

    dispatch({
      type: REMOVE_COUPON,
      payload: res.data,
    });

    dispatch(getCart());
  } catch (err) {
    handleErrors(err, true, true)(dispatch);
  }
};

export const clearCartErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART_ERRORS,
  });

  dispatch(getCart());
};

export const getLocalCart = () => (dispatch) => {
  dispatch({
    type: GET_LOCAL_CART,
  });
};

const numberfy = (num) => Number(Number(num).toFixed(2));

export const addToLocalCart = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    let product = res.data;

    let cartState = store.getState().cartReducer;

    const isProductInCart = cartState.products.some(
      (p) => p._id === productId
    );

    if (isProductInCart) {
      cartState.products = cartState.products.map((p) => {
        if (p._id === productId) {
          return {
            ...p,
            inCartQuantity: p.inCartQuantity + 1,
          };
        }
        return p;
      });
    } else {
      const { _id, name, price, image_url } = product;
      product = { _id, name, price, image_url, inCartQuantity: 1 };

      cartState.products.push(product);
    }

    cartState.totalQuantity += 1;
    cartState.subtotal = numberfy(cartState.subtotal + product.price);
    cartState.tax = numberfy(cartState.subtotal * 0.1);
    cartState.total = Math.max(
      0,
      numberfy(cartState.subtotal + cartState.tax - cartState.discount)
    );

    dispatch({
      type: ADD_TO_CART,
      payload: cartState,
    });

    dispatch(getCart());
  } catch (err) {
    handleErrors(err, true, false)(dispatch);
  }
};

export const removeOneFromLocalCart = (productId) => async (dispatch) => {
  try {
    let cartState = store.getState().cartReducer;

    const productInCart = cartState.products.find(
      (p) => p._id === productId
    );

    if (!productInCart) {
      console.error("product not in cart");
      return;
    }

    if (productInCart.inCartQuantity === 1) {
      cartState.products = [
        ...cartState.products.filter((p) => p._id !== productId),
      ];
    } else {
      cartState.products = cartState.products.map((p) => {
        if (p._id === productId) {
          return {
            ...p,
            inCartQuantity: p.inCartQuantity - 1,
          };
        }
        return p;
      });
    }

    cartState.totalQuantity -= 1;
    cartState.subtotal = numberfy(
      cartState.subtotal - productInCart.price
    );
    cartState.tax = numberfy(cartState.subtotal * 0.1);
    cartState.total = Math.max(
      0,
      numberfy(cartState.subtotal + cartState.tax - cartState.discount)
    );

    dispatch({
      type: REMOVE_ONE_FROM_CART,
      payload: cartState,
    });

    dispatch(getCart());
  } catch (err) {
    handleErrors(err, true, false)(dispatch);
  }
};

export const removeAllFromLocalCart = (productId) => async (dispatch) => {
  try {
    let cartState = store.getState().cartReducer;

    const productInCart = cartState.products.find(
      (p) => p._id === productId
    );

    if (!productInCart) {
      console.error("product not in cart");
      return;
    }

    cartState.products = [
      ...cartState.products.filter((p) => p._id !== productId),
    ];

    cartState.totalQuantity -= productInCart.inCartQuantity;
    cartState.subtotal = numberfy(
      cartState.subtotal -
        productInCart.price * productInCart.inCartQuantity
    );
    cartState.tax = numberfy(cartState.subtotal * 0.1);
    cartState.total = Math.max(
      0,
      numberfy(cartState.subtotal + cartState.tax - cartState.discount)
    );

    dispatch({
      type: REMOVE_ALL_FROM_CART,
      payload: cartState,
    });

    dispatch(getCart());
  } catch (err) {
    handleErrors(err, true, false)(dispatch);
  }
};

export const syncLocalCart = () => async (dispatch) => {
  try {
    let cartState = store.getState().cartReducer;
    if (!cartState.products.length) return;

    const res = await axios.post(`/api/cart/sync`, {
      products: cartState.products,
    });

    dispatch({
      type: SYNC_LOCAL_CART,
      payload: res.data,
    });
  } catch (err) {
    handleErrors(err, true, false)(dispatch);
  }
};
