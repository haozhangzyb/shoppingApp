import { React } from "react";
import { Typography, Box, TextField, Button, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";

import { authModalContentConstants } from "../Constants";
import WrappedInput from "./WrappedInput";

const ForgotPassword = ({ setModalContent, validationSchema }) => {
  const formikFormData = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setModalContent(authModalContentConstants.RESET_EMAIL_SENT);
    },
  });

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
        onSubmit={formikFormData.handleSubmit}
        noValidate
      >
        <WrappedInput formikFormData={formikFormData} inputName='email' />

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
            setModalContent(authModalContentConstants.SIGN_UP)
          }
        >
          {"Sign Up"}
        </Link>
      </Stack>
    </div>
  );
};

export default ForgotPassword;
