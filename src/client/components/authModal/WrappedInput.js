import React, { Fragment } from "react";
import { Typography, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { clearErrors } from "../../actions/auth";

const WrappedInput = ({ formikFormData, inputName }) => {
  let serverErrors = useSelector((state) => state.authReducer.errors);
  if (serverErrors) {
    serverErrors = serverErrors.reduce((acc, curr) => {
      acc += curr.msg;
      return acc;
    }, "");
  }

  const dispatch = useDispatch();

  return (
    <Fragment>
      <Typography
        sx={{
          mt: 2,
        }}
      >
        {inputName[0].toUpperCase() + inputName.slice(1)}
      </Typography>
      <TextField
        margin='dense'
        required
        fullWidth
        id={inputName}
        name={inputName}
        autoComplete={inputName}
        type={inputName === "password" ? "password" : "text"}
        onChange={(e) => {
          formikFormData.handleChange(e);
          // clearErrors()(dispatch);
        }}
        onBlur={formikFormData.handleBlur}
        value={formikFormData.values[inputName]}
        error={
          formikFormData.touched[inputName] &&
          Boolean(formikFormData.errors[inputName] || serverErrors)
        }
        helperText={
          (formikFormData.touched[inputName] &&
            formikFormData.errors[inputName]) ||
          serverErrors
        }
      />
    </Fragment>
  );
};

export default WrappedInput;
