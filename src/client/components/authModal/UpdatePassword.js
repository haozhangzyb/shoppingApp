import { React } from "react";
import { Typography, Box, Button, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import { authModalContentConstants } from "../../Constants";
import WrappedInput from "./WrappedInput";
import { setAuthModalContent } from "../../actions/authModal";
import { updatePassword } from "../../actions/auth";

const UpdatePassword = ({ validationSchema }) => {
  const dispatch = useDispatch();

  const formikFormData = useFormik({
    initialValues: {
      email: "",
      password: "",
      newPassword: "",
    },
    validationSchema: yup.object({
      email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string("Enter your password")
        // .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
      newPassword: yup
        .string("Enter your password")
        .notOneOf([yup.ref("password"), null], "cannot use old password")
        // .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      updatePassword(values)(dispatch);
      // setAuthModalContent(authModalContentConstants.UPDATE_PASSWORD_SUCCESSFULLY)(
      //   dispatch
      // );
    },
  });

  return (
    <div>
      <Typography component='h1' variant='h5' align='center'>
        Update your password
      </Typography>
      {/* <Typography
        align='center'
        variant='subtitle1'
        sx={{ fontSize: "0.8rem", color: "grey" }}
      >
        Enter your email, we'll send you the recovery link
      </Typography> */}
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
        <WrappedInput
          formikFormData={formikFormData}
          inputName='newPassword'
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
      <Stack
        direction={"row"}
        display='flex'
        justifyContent={"center"}
        alignItems='center'
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
      </Stack>
    </div>
  );
};

export default UpdatePassword;
