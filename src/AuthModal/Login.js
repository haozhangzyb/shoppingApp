import { React } from "react";
import { Typography, Box, TextField, Button, Link } from "@mui/material";
import { Stack } from "@mui/system";

import { authModalContentConstants } from "../constants";

const Login = ({ setModalContent }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <div>
      <Typography component='h1' variant='h5' align='center'>
        Sign in to your account
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
        <Typography
          sx={{
            mt: 2,
          }}
        >
          Password
        </Typography>
        <TextField // error={true}
          // helperText={"Incorrect password"}
          margin='dense'
          required
          fullWidth
          name='password' // label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />

        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{
            mt: 3,
            mb: 2,
          }}
        >
          Sign In
        </Button>
      </Box>

      <Stack
        direction='row'
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant='body2' display={"inline"}>
            Don't have an account?{" "}
          </Typography>
          <Link
            href='#'
            variant='body2'
            underline='none'
            onClick={() =>
              setModalContent(authModalContentConstants.SIGN_UP)
            }
          >
            {"Sign Up"}
          </Link>
        </Box>
        <Link
          href='#'
          variant='body2'
          underline='none'
          onClick={() =>
            setModalContent(authModalContentConstants.FORGOT_PASSWORD)
          }
        >
          Forgot password?
        </Link>
      </Stack>
    </div>
  );
};

export default Login;
