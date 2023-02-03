import {
  GET_PRODUCT_LIST,
  GET_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCT_ERROR,
  PRODUCT_LOADING_START,
  SET_SEARCH_INPUT,
} from "../actions/types";

const initialState = {
  productList: [],
  product: null,
  isLoading: true,
  error: {},
  searchInput: "",
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
        productList: payload,
        isLoading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        isLoading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        product: payload,
        productList: [payload, ...state.productList],
        isLoading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productList: state.productList.filter(
          (product) => product._id !== payload
        ),
        isLoading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: payload,
        productList: state.productList.map((product) =>
          product._id === payload._id ? payload : product
        ),
        isLoading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case PRODUCT_LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: payload,
      };
    default:
      return state;
  }
};

export default productReducer;
