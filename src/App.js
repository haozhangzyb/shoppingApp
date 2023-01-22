import { Fragment, useState } from "react";
import { Box } from "@mui/system";

import "./App.css";

import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import AuthModal from "./AuthModal";

import { authModalContentConstants } from "./Constants";

function App() {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(
    authModalContentConstants.LOG_IN
  );
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => {
    setOpen(false);
    setModalContent(authModalContentConstants.LOG_IN);
  };

  return (
    <Fragment>
      <Header handleModalOpen={handleModalOpen} />
      <AuthModal
        open={open}
        handleModalClose={handleModalClose}
        modalContent={modalContent}
        setModalContent={setModalContent}
      />
      <Box
        sx={{
          height: "93vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          // bgcolor: "#a2a8d3",
        }}
      >
        <Body />
        <Footer />
      </Box>
    </Fragment>
  );
}

export default App;
