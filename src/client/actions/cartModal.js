import { OPEN_CART_MODAL, CLOSE_CART_MODAL } from "./types";

export const openCartModal = () => (dispatch) => {
  dispatch({
    type: OPEN_CART_MODAL,
  });
};

export const closeCartModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_CART_MODAL,
  });
};
