import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

export function useForm(initialFValues, validateOnChange = false) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues) {
      temp.fullName = fieldValues.fullName ? "" : "This Field is Required";
    }
    if ("email" in fieldValues) {
      temp.email =
        /$^|.+@.+..+/.test(fieldValues.email) && fieldValues.email
          ? ""
          : "Email is not valid";
    }
    if ("password" in fieldValues) {
      temp.password =
        /$^|(?=.*[a-z])/.test(fieldValues.password) && fieldValues.password
          ? /$^|(?=.*[A-Z])/.test(fieldValues.password)
            ? /$^|(?=.*[0-9])/.test(fieldValues.password)
              ? /$^|(?=.*[!@#\$%\^&\*])/.test(fieldValues.password)
                ? /$^|(?=.{8,})/.test(fieldValues.password)
                  ? ""
                  : "password must be more than 8 characters"
                : "password must contain symbols"
              : "password must contain numbers"
            : "password must contain capital letters"
          : "Password must contain: small letters, capital letters, symbols and numbers";
    }
    if ("mobile" in fieldValues) {
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 digits required";
    }
    setErrors({ ...temp });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };
  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    validate,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
    "& .MuiGrid-root": {
      marginLeft: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;

  return (
    <form className={classes.root} {...other}>
      {/* autoComplete="off" */}
      {props.children}
    </form>
  );
}
