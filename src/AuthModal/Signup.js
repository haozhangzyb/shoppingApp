import { Fragment, React } from "react";
import { Typography, Box, TextField, Button, Link } from "@mui/material";
import { Stack } from "@mui/system";

import { authModalContentConstants } from "../Constants";

const Signup = ({ setModalContent }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <Fragment>
      <Typography component='h1' variant='h5' align='center'>
        Sign up an account
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
            backgroundColor: "#4f48dd",
          }}
        >
          Create Account
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
            Already have an account?{" "}
          </Typography>
          <Link
            href='#'
            variant='body2'
            underline='none'
            onClick={() =>
              setModalContent(authModalContentConstants.LOG_IN)
            }
          >
            {"Log In"}
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
    </Fragment>
  );
};

export default Signup;
