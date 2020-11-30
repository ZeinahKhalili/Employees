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
const auth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};
function Register(props) {
  const classes = useStyles();

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

  return (
    <Paper className={classes.paper}>
      <div className={classes.pageContent}>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item sm={6}>
              <Controls.Input
                label="Full Name"
                name="fullName"
                value={values.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
              />
              <Controls.Input
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <Controls.Input
                label="Mobile"
                name="mobile"
                value={values.mobile}
                onChange={handleInputChange}
                error={errors.mobile}
              />
              <Controls.Input
                label="City"
                name="city"
                value={values.city}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
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

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
