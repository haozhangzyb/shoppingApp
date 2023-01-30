import { combineReducers } from "redux";

import authReducer from "./auth";
import authModalReducer from "./authModal";
import productReducer from "./product";
import cartReducer from "./cart";

export default combineReducers({
  authReducer,
  authModalReducer,
  productReducer,
  cartReducer,
});
