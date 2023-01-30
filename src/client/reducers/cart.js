import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

const initialState = {
  cart: [],
  isLoading: true,
  error: {},
  totalPrice: 0.0,
  totalQuantity: 0,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
      return {
        ...state,
        cart: payload,
        isLoading: false,
      };
    case ADD_TO_CART:
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
        totalPrice: state.totalPrice + payload.price,
        totalQuantity: state.totalQuantity + 1,
        isLoading: false,
      };
    case REMOVE_FROM_CART:
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
        totalPrice: state.totalPrice - payload.price,
        totalQuantity: state.totalQuantity - 1,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
