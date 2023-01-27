import { Provider } from "react-redux";
import { Box } from "@mui/system";

import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Body from "./components/layout/Body";
import AuthModal from "./components/authModal";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <AuthModal />
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
