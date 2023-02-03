import { React } from "react";
import { Typography, Box, Button } from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useDispatch } from "react-redux";
import { setAuthModalContent } from "../../actions/authModal";
import { authModalContentConstants } from "../../Constants";

export const UpdatePasswordSuccess = () => {
  const dispatch = useDispatch();
  return (
    <Box
      direction='column'
      sx={{
        py: 7,
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
        Update successfully!
      </Typography>
      <Button
        variant='contained'
        sx={{ width: "50%", mx: "auto", mt: 4 }}
        onClick={() =>
          setAuthModalContent(authModalContentConstants.LOG_IN)(dispatch)
        }
      >
        Log in
      </Button>
    </Box>
  );
};
