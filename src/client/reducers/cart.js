import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
} from "../actions/types";

const initialState = {
  cart: [],
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
      return {
        ...state,
        cart: payload,
        isLoading: false,
      };
    case ADD_TO_CART:
      newSubtotal = numberfy(state.subtotal + payload.price);

      return {
        ...state,
        cart: state.cart.find((item) => item._id === payload._id)
          ? state.cart.map((item) =>
              item._id === payload._id
                ? {
                    ...item,
                    inCartQuantity: (item.inCartQuantity || 0) + 1,
                  }
                : item
            )
          : [...state.cart, { ...payload, inCartQuantity: 1 }],
        totalQuantity: state.totalQuantity + 1,
        isLoading: false,
        subtotal: newSubtotal,
        tax: numberfy(newSubtotal * 0.1),
        total: numberfy(newSubtotal * 1.1),
      };
    case REMOVE_ONE_FROM_CART:
      newSubtotal = numberfy(state.subtotal - payload.price);

      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === payload._id
            ? {
                ...item,
                inCartQuantity: (item.inCartQuantity || 0) - 1,
              }
            : item
        ),
        totalQuantity: state.totalQuantity - 1,
        isLoading: false,
        subtotal: newSubtotal,
        tax: numberfy(newSubtotal * 0.1),
        total: numberfy(newSubtotal * 1.1),
      };
    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== payload._id),
        subtotal: Number(
          Number(
            state.subtotal - payload.price * payload.inCartQuantity
          ).toFixed(2)
        ),
        totalQuantity: state.totalQuantity - payload.inCartQuantity,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
