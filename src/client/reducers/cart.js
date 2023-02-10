import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_LOCAL_CART,
  CART_ERROR,
  APPLY_COUPON,
  REMOVE_COUPON,
  CLEAR_CART_ERRORS,
} from "../actions/types";

const initialState = {
  products: [],
  isLoading: true,
  error: "",
  totalQuantity: 0,
  subtotal: 0.0,
  tax: 0.0,
  coupons: [],
  discount: 0.0,
  total: 0.0,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
    case ADD_TO_CART:
    case REMOVE_ONE_FROM_CART:
    case REMOVE_ALL_FROM_CART:
    case APPLY_COUPON:
    case REMOVE_COUPON:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case CLEAR_LOCAL_CART:
      return {
        ...initialState,
        isLoading: false,
      };
    case CART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case CLEAR_CART_ERRORS:
      return {
        ...state,
        error: "",
      };

    default:
      return state;
  }
};

export default cartReducer;
