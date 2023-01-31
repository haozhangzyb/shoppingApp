import { React } from "react";
import { Typography, Box } from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

export const ResetEmailSent = () => {
  return (
    <Box
      direction='column'
      sx={{
        py: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <MarkEmailReadIcon
        sx={{ fontSize: 40, color: "#4f48dd", margin: "auto" }}
      />

      <Typography
        align='center'
        variant='subtitle1'
        // sx={{ fontSize: "0.8rem" }}
      >
        We've sent the update email link to your email, please check your
        inbox.
      </Typography>
    </Box>
  );
};
