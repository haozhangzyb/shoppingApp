import React, { Fragment } from "react";
import { Typography, TextField } from "@mui/material";

const WrappedInput = ({ formikFormData, inputName }) => {
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
        id='email'
        name='email'
        autoComplete='email'
        onChange={formikFormData.handleChange}
        onBlur={formikFormData.handleBlur}
        value={formikFormData.values[inputName]}
        error={
          formikFormData.touched[inputName] &&
          Boolean(formikFormData.errors[inputName])
        }
        helperText={
          formikFormData.touched[inputName] &&
          formikFormData.errors[inputName]
        }
      />
    </Fragment>
  );
};

export default WrappedInput;
