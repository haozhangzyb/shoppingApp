import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import React from "react";

const DiscountArea = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant='body2'
        fontWeight={"bold"}
        sx={{ color: "#6c727f" }}
      >
        Apply Discount Code
      </Typography>
      <Stack direction='row' spacing={2} sx={{ mt: 1 }}>
        <TextField sx={{ flexGrow: 1 }} variant='outlined' size='small' />
        <Button
          variant='contained'
          sx={{
            height: 40,
            width: 100,
            textTransform: "none",
            bgcolor: "#4f48dd",
          }}
        >
          Apply
        </Button>
      </Stack>
    </Box>
  );
};

export default DiscountArea;
