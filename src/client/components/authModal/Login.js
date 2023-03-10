import { React } from "react";
import {
  Typography,
  Box,
  Button,
  Link,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { authModalContentConstants } from "../../Constants";
import WrappedInput from "./WrappedInput";
import { login as loginAction } from "../../actions/auth";
import { setAuthModalContent } from "../../actions/authModal";

const Login = ({ validationSchema }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const formikFormData = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      loginAction(values)(dispatch);
    },
  });

  return (
    <div>
      {/* <div>{JSON.stringify(authState)}</div> */}
      <Typography component='h1' variant='h5' align='center'>
        Sign in to your account
      </Typography>
      <Box
        component='form'
        onSubmit={formikFormData.handleSubmit}
        noValidate
      >
        <WrappedInput formikFormData={formikFormData} inputName='email' />
        <WrappedInput
          formikFormData={formikFormData}
          inputName='password'
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
          Sign In
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
            Don't have an account?{" "}
          </Typography>
          <Link
            href='#'
            variant='body2'
            underline='none'
            onClick={() =>
              setAuthModalContent(authModalContentConstants.SIGN_UP)(
                dispatch
              )
            }
          >
            {"Sign Up"}
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
              setAuthModalContent(
                authModalContentConstants.UPDATE_PASSWORD
              )(dispatch)
            }
          >
            Update password
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
