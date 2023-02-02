import { ADD_ALERT, REMOVE_ALERT } from "../actions/types";

// { id: 1, msg: "please login", alertType: "success" },
// alertType: "success", "error", "warning", "info"
const initialState = [];

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
