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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("/users", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: "my@email.com",
  //           password: "password",
  //         }),
  //       });
  //       const data = await res.json();

  //       console.log(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;