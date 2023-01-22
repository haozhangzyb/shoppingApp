import { useState, React } from "react";
import { Modal, Box, Container, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { authModalContentConstants } from "../constants";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

const AuthModal = ({ open, handleModalClose }) => {
  const [modalContent, setModalContent] = useState(
    authModalContentConstants.LOG_IN
  );

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
          <Login setModalContent={setModalContent} />
        )}
        {modalContent === authModalContentConstants.SIGN_UP && (
          <Signup setModalContent={setModalContent} />
        )}
        {modalContent === authModalContentConstants.FORGOT_PASSWORD && (
          <ForgotPassword setModalContent={setModalContent} />
        )}
      </Container>
    </Modal>
  );
};

export default AuthModal;
