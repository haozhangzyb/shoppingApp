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
import AddProduct from "./components/AddProduct/AddProduct";
import ProductDetail from "./components/productDetail";
import ErrorPage from "./components/ErrorPage";
import CartModal from "./components/cartModal";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute";

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
    // <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Box
          sx={{
            minHeight: "100vh",
            maxWidth: "100vw",
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            bgcolor: "#f9fafb",
          }}
        >
          <Header />
          <AuthModal />
          <CartModal />

          <Box my={3}>
            <Routes>
              <Route exact path='/' element={<ProductList />} />
              <Route
                exact
                path='/products/:id'
                element={<ProductDetail />}
              />

              <Route
                exact
                path='/addProduct'
                element={<PrivateRoute component={AddProduct} />}
              />
              <Route
                exact
                path='/editProduct/:id'
                element={
                  <PrivateRoute
                    component={AddProduct}
                    isEditingProduct={true}
                  />
                }
              />

              <Route path='/error' element={<ErrorPage />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </BrowserRouter>
    </Provider>
    // </ThemeProvider>
  );
}

export default App;
