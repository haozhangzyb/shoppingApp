import React from "react";
import {
  Modal,
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Grid,
  Link,
  Input,
  IconButton,
} from "@mui/material";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "400px",
  maxWidth: "600px !important",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  px: 2,
  pt: 2,
  pb: 4,
};

const SignInModal = ({ open, handleClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Container sx={style}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleClose} sx={{ m: 0, p: 0 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography component='h1' variant='h5' align='center'>
          Sign in to your account
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <Typography>Email</Typography>
          <TextField
            margin='dense'
            required
            fullWidth
            id='email'
            // label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <Typography sx={{ mt: 2 }}>Password</Typography>
          <TextField
            margin='dense'
            required
            fullWidth
            name='password'
            // label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>

        <Grid container>
          <Grid item xs>
            <Typography variant='body2' display={"inline"}>
              Don't have an account?{" "}
            </Typography>
            <Link href='#' variant='body2' underline='none'>
              {"Sign Up"}
            </Link>
          </Grid>
          <Grid item>
            <Link href='#' variant='body2' underline='none'>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
};

export default SignInModal;
