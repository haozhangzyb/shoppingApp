import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
} from "../actions/types";

const initialState = {
  products: [],
  isLoading: true,
  error: {},
  totalQuantity: 0,
  subtotal: 0.0,
  tax: 0.0,
  discount: 0.0,
  total: 0.0,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const numberfy = (num) => Number(Number(num).toFixed(2));
  let newSubtotal;

  switch (type) {
    case GET_CART:
    case ADD_TO_CART:
    case REMOVE_ONE_FROM_CART:
    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        isLoading: false,
        ...payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
