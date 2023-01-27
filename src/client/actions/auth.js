import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

import setAuthToken from "../utils/setAuthToken";
import { closeModal } from "./authModal";

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
      });
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
        type: LOGIN_FAIL,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
