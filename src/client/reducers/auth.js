import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_LOADING_END,
  CLEAR_AUTH_ERRORS,
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import { userType } from "../Constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: [],
  userType: userType.CUSTOMER,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      // payload:{user:{email, userType}}
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
        userType: payload.userType,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      // payload: { token }
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
        errors: [],
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      setAuthToken();
      // payload: [{msg: "Invalid credentials"}, {msg:"..."}]
      return {
        ...initialState,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        errors: payload,
        userType: userType.CUSTOMER,
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errors: [],
      };
    case AUTH_LOADING_END:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
