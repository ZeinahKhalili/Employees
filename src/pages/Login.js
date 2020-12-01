import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Link, Redirect, Route, useHistory } from "react-router-dom";
import Controls from "../components/Controls/Controls";
import Notification from "../components/Notification";
import { Form, useForm } from "../components/useForm";
import * as userService from "../services/userService";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  paper: {
    margin: theme.spacing(10),
    marginLeft: theme.spacing(40),
    marginRight: theme.spacing(40),
  },
  link: {
    textDecoration: "none",
    fontSize: theme.spacing(2.5),
    marginTop: theme.spacing(1.5),
  },
  showPass: {
    marginTop: theme.spacing(10),
  },
}));

const initialFValues = {
  id: 0,
  email: "",
  password: "",
};

function Login(props) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
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
        setNotify({
          isOpen: true,
          message: "Wrong password or email, please try again",
          type: "error",
        });
      }
    } else {
      setNotify({
        isOpen: true,
        message: "Wrong password or email, please try again",
        type: "error",
      });
    }
  };
  const handlePassword = () => {
    setShowPassword(!showPassword);
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
                  visibility="true"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                <Controls.Input
                  label="Password"
                  name="password"
                  visibility={showPassword}
                  value={values.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item md={4} className={classes.showPass}>
                <Controls.Checkbox
                  name="showPassword"
                  onChange={handlePassword}
                  label="show password"
                  iconName="eye"
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
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default Login;
