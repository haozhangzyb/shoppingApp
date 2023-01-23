import { Fragment, React } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Link,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/material/styles";

import { authModalContentConstants } from "../Constants";

const Signup = ({ setModalContent }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "center" : "flex-start",
            alignContent: "center",
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
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "center" : "flex-end",
            alignContent: "center",
          }}
        >
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
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Signup;
