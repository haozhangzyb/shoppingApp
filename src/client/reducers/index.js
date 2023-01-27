import { combineReducers } from "redux";

import authReducer from "./auth";
import authModalReducer from "./authModal";

export default combineReducers({
  authReducer,
  authModalReducer,
});
