import { combineReducers } from "redux";

import authReducer from "./auth";
import authModalReducer from "./authModal";
import productReducer from "./product";

export default combineReducers({
  authReducer,
  authModalReducer,
  productReducer,
});
