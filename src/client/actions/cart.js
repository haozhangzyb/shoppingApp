import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART } from "./types";

// const getCart = () =>

export const addToCart = (productObj) => (dispatch) => {
  console.log("addToCart");
  dispatch({
    type: ADD_TO_CART,
    payload: productObj,
  });
};

export const removeFromCart = (productObj) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productObj,
  });
};
