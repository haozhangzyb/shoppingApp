import { React } from "react";
import { Modal, Box, Container, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { authModalContentConstants } from "../../Constants";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import { ResetEmailSent } from "./ResetEmailSent";

import * as yup from "yup";

const AuthModal = ({
  open,
  handleModalClose,
  modalContent,
  setModalContent,
}) => {
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
      open={open}
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
          <Login
            setModalContent={setModalContent}
            validationSchema={validationSchema}
          />
        )}
        {modalContent === authModalContentConstants.SIGN_UP && (
          <Signup
            setModalContent={setModalContent}
            validationSchema={validationSchema}
          />
        )}
        {modalContent === authModalContentConstants.FORGOT_PASSWORD && (
          <ForgotPassword
            setModalContent={setModalContent}
            validationSchema={emailValidationSchema}
          />
        )}
        {modalContent === authModalContentConstants.RESET_EMAIL_SENT && (
          <ResetEmailSent />
        )}
      </Container>
    </Modal>
  );
};

export default AuthModal;
