import { Stack, Typography, Box, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

function CartModalHeader(props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#4f48dd",
        color: "white",
        p: 2,
      }}
    >
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='h5' fontWeight={"bold"}>
          Cart
        </Typography>
        <Typography variant='h6' fontSize={15}>
          ({props.totalQuantity})
        </Typography>
      </Stack>
      <IconButton
        onClick={props.handleCartModalClose}
        sx={{
          m: 0,
          p: 0,
          color: "white",
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default CartModalHeader;
