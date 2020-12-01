import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Controls from "../components/Controls/Controls";
import { Form, useForm } from "../components/useForm";
import * as userService from "../services/userService";
import Employees from "./Employees/Employees";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  paper: {
    margin: theme.spacing(3),
  },
}));

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  password: "",
  mobile: "",
  city: "",
};
function Register(props) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const { values, handleInputChange, errors, validate } = useForm(
    initialFValues,
    true
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      userService.insertUser(values);

      props.history.push("/");
    }
  };
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.pageContent}>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item sm={6}>
              <Controls.Input
                label="Full Name"
                type="text"
                name="fullName"
                visibility="true"
                value={values.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
              />
              <Controls.Input
                label="Email"
                name="email"
                type="text"
                value={values.email}
                visibility="true"
                onChange={handleInputChange}
                error={errors.email}
              />
              <Controls.Input
                label="Mobile"
                visibility="true"
                name="mobile"
                type="text"
                value={values.mobile}
                onChange={handleInputChange}
                error={errors.mobile}
              />
              <Controls.Input
                label="City"
                visibility="true"
                type="text"
                name="city"
                value={values.city}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="Password"
                type="password"
                visibility={showPassword}
                name="password"
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
              />
              <Controls.Checkbox
                name="showPassword"
                onChange={handlePassword}
                value={showPassword}
                label="show password"
                iconName="eye"
              />

              <Controls.Button text="Register" type="submit" />
            </Grid>
          </Grid>
        </Form>
      </div>
    </Paper>
  );
}

export default Register;
