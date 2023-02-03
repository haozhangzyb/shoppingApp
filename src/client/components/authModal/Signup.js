import { Fragment, React } from "react";
import {
  Typography,
  Box,
  Button,
  Link,
  useMediaQuery,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { authModalContentConstants } from "../../Constants";
import WrappedInput from "./WrappedInput";
import { register as registerAction } from "../../actions/auth";
import { setAuthModalContent } from "../../actions/authModal";

const Signup = ({ validationSchema }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const formikFormData = useFormik({
    initialValues: {
      email: "",
      password: "",
      userType: "admin",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      // console.log(formikFormData.values.email);
      registerAction(values)(dispatch);
    },
  });

  return (
    <Fragment>
      {/* <div>{JSON.stringify(authState)}</div> */}
      <Typography component='h1' variant='h5' align='center'>
        Sign up an account
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

        <Typography sx={{ mt: 2 }}>User Type: </Typography>
        <RadioGroup
          name='userType'
          row
          value={formikFormData.values.userType}
          onChange={formikFormData.handleChange}
        >
          <FormControlLabel
            value='customer'
            control={<Radio />}
            label='Customer'
          />
          <FormControlLabel
            value='admin'
            control={<Radio />}
            label='Admin'
          />
        </RadioGroup>

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
              setAuthModalContent(authModalContentConstants.LOG_IN)(
                dispatch
              )
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
              setAuthModalContent(
                authModalContentConstants.FORGOT_PASSWORD
              )(dispatch)
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
