import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { Link, Redirect, Route, useHistory } from "react-router-dom";
import Controls from "../components/Controls/Controls";
import { Form, useForm } from "../components/useForm";
import { withRouter } from "react-router-dom";
import * as userService from "../services/userService";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  paper: {
    margin: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    fontSize: theme.spacing(2.5),
    marginTop: theme.spacing(1.5),
  },
}));

const initialFValues = {
  id: 0,
  email: "",
  password: "",
};

function Login(props) {
  const classes = useStyles();

  const { values, handleInputChange, errors, validate } = useForm(
    initialFValues,
    true
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      userService.auth.authenticate();

      if (userService.getUser(values.email, values.password)) {
        props.history.push("/employees");
      } else {
        alert("Wrong password or email, please try again");
      }
    }
  };
  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.pageContent}>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item md={6}>
                <Controls.Input
                  label="Email"
                  name="email"
                  type="text"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                <Controls.Input
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
              </Grid>

              <Grid item md={6}>
                <Controls.Button text="Log in" type="submit" />
                <br />
                <span className={classes.link}>
                  Don't have an account?
                </span>{" "}
                <Link to="/signup" className={classes.link}>
                  Sign up!
                </Link>
              </Grid>
            </Grid>
          </Form>
        </div>
      </Paper>
    </>
  );
}

export default Login;

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userService.auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
