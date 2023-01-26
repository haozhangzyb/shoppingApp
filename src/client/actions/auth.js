import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

export const register =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await fetch("/users", {
        method: "POST",
        headers,
        body,
      });

      const data = await res.json();
      console.log(data);
      //   const res = await axios.post("/api/users", body, {headers});

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });

      //   dispatch(loadUser());
    } catch (err) {
      console.error(err);
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
