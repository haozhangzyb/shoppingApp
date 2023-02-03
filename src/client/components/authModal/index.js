import { React } from "react";
import { Modal, Box, Container, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { authModalContentConstants } from "../../Constants";
import Login from "./Login";
import Signup from "./Signup";
import UpdatePassword from "./UpdatePassword";
import { UpdatePasswordSuccess } from "./UpdatePasswordSuccess";
import { closeAuthModal } from "../../actions/authModal";

const AuthModal = () => {
  const { isModalOpen, modalContent } = useSelector(
    (state) => state.authModalReducer
  );
  const dispatch = useDispatch();
  // const authState = useSelector((state) => state.authReducer);

  const handleModalClose = () => {
    closeAuthModal()(dispatch);
  };

  // if (authState.isAuthenticated) {
  //   handleModalClose();
  // }

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      // .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const emailValidationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      disableScrollLock={true}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}
    >
      <Container
        sx={{
          width: "90%",
          maxWidth: "450px !important",
          bgcolor: "background.paper",
          boxShadow: 24,
          px: 2,
          pt: 2,
          pb: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleModalClose} sx={{ m: 0, p: 0 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {modalContent === authModalContentConstants.LOG_IN && (
          <Login validationSchema={validationSchema} />
        )}
        {modalContent === authModalContentConstants.SIGN_UP && (
          <Signup validationSchema={validationSchema} />
        )}
        {modalContent === authModalContentConstants.UPDATE_PASSWORD && (
          <UpdatePassword validationSchema={emailValidationSchema} />
        )}
        {modalContent ===
          authModalContentConstants.UPDATE_PASSWORD_SUCCESSFULLY && (
          <UpdatePasswordSuccess />
        )}
      </Container>
    </Modal>
  );
};

export default AuthModal;
