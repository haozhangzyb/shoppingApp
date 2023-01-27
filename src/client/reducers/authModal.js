import { authModalContentConstants } from "../Constants";
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_MODAL_CONTENT,
} from "../actions/types";

const initialState = {
  isModalOpen: false,
  modalContent: authModalContentConstants.LOG_IN,
};

const authModalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case SET_MODAL_CONTENT:
      return {
        ...state,
        modalContent: payload,
      };
    default:
      return state;
  }
};

export default authModalReducer;
