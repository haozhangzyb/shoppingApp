import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 70, color: "#4f48dd", mb: 2 }} />
      <Typography variant='h5' sx={{ mb: 2 }}>
        {" "}
        Oops, something went wrong!
      </Typography>
      <Button
        variant='contained'
        sx={{
          bgcolor: "#4f48dd",
          color: "white",
          textTransform: "none",
        }}
        onClick={() => navigate("/")}
      >
        Go home
      </Button>
    </Box>
  );
};

export default ErrorPage;
