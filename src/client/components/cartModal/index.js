import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal, Container, Typography, Box, Divider } from "@mui/material";

import { openCartModal, closeCartModal } from "../../actions/cartModal";
import CartModalHeader from "./CartModalHeader";
import DiscountArea from "./DiscountArea";
import CartProductList from "./CartProductList";
import TotalPriceArea from "./TotalPriceArea";
import { getCart } from "../../actions/cart";

const CartModal = () => {
  const isCartModalOpen = useSelector(
    (state) => state.cartModalReducer.isCartModalOpen
  );

  const cartState = useSelector((state) => state.cartReducer);
  const cartStateJson = JSON.stringify(cartState);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) dispatch(getCart());
    // dispatch(getCart());
  }, [cartStateJson, dispatch]);

  const handleCartModalClose = () => {
    closeCartModal()(dispatch);
  };

  return (
    <Modal
      open={isCartModalOpen}
      onClose={handleCartModalClose}
      disableScrollLock={true}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100vw",
        // maxHeight: "100vh",
        // overflow: "scroll",
      }}
    >
      <Container
        sx={{
          //   width: "100%",
          maxWidth: "600px !important",
          //   bgcolor: "background.paper",
          //   boxShadow: 24,
          //   p: 0,
          //   m: 0,
          maxHeight: "100vh",
          overflow: "scroll",
          py: 1,
        }}
      >
        <CartModalHeader
          totalQuantity={cartState.totalQuantity}
          handleCartModalClose={handleCartModalClose}
        />
        <Box sx={{ bgcolor: "white", py: 2, px: 2 }}>
          <CartProductList cartState={cartState} />
          <DiscountArea />
          <Divider sx={{ mt: 3 }} />
          <TotalPriceArea cartState={cartState} />
        </Box>
      </Container>
    </Modal>
  );
};

export default CartModal;
