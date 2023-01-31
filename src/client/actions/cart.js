import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
} from "./types";

// const getCart = () =>

export const addToCart = (productObj) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: productObj,
  });
};

export const removeOneFromCart = (productObj) => (dispatch) => {
  dispatch({
    type: REMOVE_ONE_FROM_CART,
    payload: productObj,
  });
};

export const removeAllFromCart = (productObj) => (dispatch) => {
  dispatch({
    type: REMOVE_ALL_FROM_CART,
    payload: productObj,
  });
};
