import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_LOADING_END,
  CLEAR_ERRORS,
} from "../actions/types";

import setAuthToken from "../utils/setAuthToken";
import { closeModal } from "./authModal";
import { setModalContent } from "./authModal";
import { authModalContentConstants } from "../Constants";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    // set global header ("x-auth-token")
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.response.data.errors);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ email, password }) =>
  async (dispatch) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/users", body, { headers });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
      dispatch(closeModal());
    } catch (err) {
      console.error(err.response.data.errors);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors,
      });

      setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    // const headers = {
    //   "Content-Type": "application/json",
    // };

    // const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", { email, password });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
      dispatch(closeModal());
    } catch (err) {
      console.error(err);
      console.error(err.response.data.errors);
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.errors,
      });

      setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const loadingEnd = () => (dispatch) => {
  dispatch({ type: AUTH_LOADING_END });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/auth/forgot-password/${email}`);

    console.log(res.data);
    dispatch(setModalContent(authModalContentConstants.RESET_EMAIL_SENT));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.errors,
    });

    setTimeout(() => {
      dispatch(clearErrors());
    }, 2000);
  }
};
