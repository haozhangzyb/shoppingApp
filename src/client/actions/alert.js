import { v4 as uuidv4 } from "uuid";

import { ADD_ALERT, REMOVE_ALERT } from "./types";

// "success", "error", "warning", "info"
export const addAlert =
  (msg, alertType, timeout = 3000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: ADD_ALERT,
      payload: { id, msg, alertType },
    });

    setTimeout(
      () => dispatch({ type: REMOVE_ALERT, payload: id }),
      timeout
    );
  };

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};
