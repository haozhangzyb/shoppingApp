import { authModalContentConstants } from "../Constants";
import {
  OPEN_AUTH_MODAL,
  CLOSE_AUTH_MODAL,
  SET_AUTH_MODAL_CONTENT,
} from "../actions/types";

const initialState = {
  isModalOpen: false,
  modalContent: authModalContentConstants.LOG_IN,
};

const authModalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case OPEN_AUTH_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case CLOSE_AUTH_MODAL:
      return {
        ...state,
        isModalOpen: false,
        modalContent: authModalContentConstants.LOG_IN,
      };
    case SET_AUTH_MODAL_CONTENT:
      return {
        ...state,
        modalContent: payload,
      };
    default:
      return state;
  }
};

export default authModalReducer;
