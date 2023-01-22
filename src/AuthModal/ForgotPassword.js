import { React } from "react";
import { Typography, Box, TextField, Button, Link } from "@mui/material";
import { Stack } from "@mui/system";

import { authModalContentConstants } from "../Constants";

const ForgotPassword = ({ setModalContent }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
    });
    setModalContent(authModalContentConstants.RESET_EMAIL_SENT);
  };
  return (
    <div>
      <Typography component='h1' variant='h5' align='center'>
        Update your password
      </Typography>
      <Typography
        align='center'
        variant='subtitle1'
        sx={{ fontSize: "0.8rem", color: "grey" }}
      >
        Enter your email, we'll send you the recovery link
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: 3,
        }}
      >
        <Typography>Email</Typography>

        <TextField
          margin='dense'
          required
          fullWidth
          id='email' // label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />

        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#4f48dd",
          }}
        >
          Update password
        </Button>
      </Box>

      <Typography variant='body2' display={"inline"}>
        Don't have an account?{" "}
      </Typography>
      <Link
        href='#'
        variant='body2'
        underline='none'
        onClick={() => setModalContent(authModalContentConstants.SIGN_UP)}
      >
        {"Sign Up"}
      </Link>
    </div>
  );
};

export default ForgotPassword;
