import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOADING_END,
  CLEAR_ERRORS,
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: [],
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
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
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        errors: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };
    case LOADING_END:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
