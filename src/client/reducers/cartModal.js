import { OPEN_CART_MODAL, CLOSE_CART_MODAL } from "../actions/types";

const initialState = {
  isCartModalOpen: false,
};

const cartModalReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case OPEN_CART_MODAL:
      return {
        ...state,
        isCartModalOpen: true,
      };
    case CLOSE_CART_MODAL:
      return {
        ...state,
        isCartModalOpen: false,
      };
    default:
      return state;
  }
};

export default cartModalReducer;
