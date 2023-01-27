import { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/system";

import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Body from "./components/layout/Body";
import AuthModal from "./components/authModal";

import { authModalContentConstants } from "./Constants";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(
    authModalContentConstants.LOG_IN
  );
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent(authModalContentConstants.LOG_IN);
  };

  return (
    <Provider store={store}>
      <Header handleModalOpen={handleModalOpen} />
      <AuthModal
        open={isModalOpen}
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
    </Provider>
  );
}

export default App;
