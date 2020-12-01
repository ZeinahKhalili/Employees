import { TextField } from "@material-ui/core";
import React from "react";

function Input(props) {
  const {
    name,
    label,
    value,
    onChange,
    type,
    visibility,
    error = null,
  } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      type={visibility ? "text" : "password"}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}

export default Input;
