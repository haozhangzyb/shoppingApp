import {
  OPEN_AUTH_MODAL,
  CLOSE_AUTH_MODAL,
  SET_AUTH_MODAL_CONTENT,
} from "../actions/types";

export const openModal = () => (dispatch) => {
  dispatch({
    type: OPEN_AUTH_MODAL,
  });
};

export const closeModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_AUTH_MODAL,
  });
};

export const setModalContent = (content) => (dispatch) => {
  dispatch({
    type: SET_AUTH_MODAL_CONTENT,
    payload: content,
  });
};
