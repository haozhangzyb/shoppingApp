import { useEffect } from "react";
import { Provider } from "react-redux";
import { Box } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Body from "./components/layout/Body";
import AuthModal from "./components/authModal";

import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser, logout, loadingEnd } from "./actions/auth";
import ProductList from "./components/productList";
import AddProduct from "./components/productList/AddProduct";

function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);

      // try to fetch a user, if no token or invalid token we
      // will get a 401 response from our API
      store.dispatch(loadUser());
    } else {
      store.dispatch(loadingEnd());
    }

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch(logout());
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <AuthModal />
        {/* <Box
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          // bgcolor: "#a2a8d3",
        }}
      >
        <Body />
      </Box> */}
        {/* <Box sx={{ pb: 20 }}> */}
        <Routes>
          <Route exact path='/' element={<ProductList />} />
          <Route exact path='/addProduct' element={<AddProduct />} />
        </Routes>
        {/* </Box> */}
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
