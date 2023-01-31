import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal, Container, Typography, Box, Divider } from "@mui/material";

import { openCartModal, closeCartModal } from "../../actions/cartModal";
import CartModalHeader from "./CartModalHeader";
import DiscountArea from "./DiscountArea";
import CartProductList from "./CartProductList";
import TotalPriceArea from "./TotalPriceArea";

const CartModal = () => {
  const isCartModalOpen = useSelector(
    (state) => state.cartModalReducer.isCartModalOpen
  );
  const cartState = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

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
        maxHeight: "100vh",
        overflow: "auto",
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
