import axios from "axios";
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
import { closeAuthModal } from "./authModal";
import { setAuthModalContent } from "./authModal";
import { authModalContentConstants } from "../Constants";
import { getCart, clearLocalCart, syncLocalCart } from "./cart";

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

    syncLocalCart()(dispatch);

    // dispatch(getCart());
  } catch (err) {
    // console.error(err.response.data.errors);
    console.error(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ email, password, userType }) =>
  async (dispatch) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({ email, password, userType });

    try {
      const res = await axios.post("/api/users", body, { headers });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
      dispatch(closeAuthModal());
    } catch (err) {
      console.error(err);
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
      dispatch(closeAuthModal());
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
  dispatch(clearLocalCart());
};

export const loadingEnd = () => (dispatch) => {
  dispatch({ type: AUTH_LOADING_END });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_AUTH_ERRORS });
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/auth/forgot-password/${email}`);

    console.log(res.data);
    dispatch(
      setAuthModalContent(
        authModalContentConstants.UPDATE_PASSWORD_SUCCESSFULLY
      )
    );
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

export const updatePassword =
  ({ email, password, newPassword }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(`/api/auth/update-password/`, {
        email,
        password,
        newPassword,
      });

      console.log(res.data);
      dispatch(
        setAuthModalContent(
          authModalContentConstants.UPDATE_PASSWORD_SUCCESSFULLY
        )
      );
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
