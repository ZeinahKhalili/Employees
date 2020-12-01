import { Grid, IconButton, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import Controls from "../components/Controls/Controls";
import { Form, useForm } from "../components/useForm";
import * as userService from "../services/userService";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Notification from "../components/Notification";

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
  title: {
    display: "flex",
  },
}));

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  password: "",
  checkPassword: "",
  mobile: "",
  city: "",
};
function Register(props) {
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
      if (userService.checkEmail(values.email)) {
        setNotify({
          isOpen: true,
          message: "This email already has an account",
          type: "error",
        });
      } else {
        userService.insertUser(values);
        props.history.push("/");
      }
    }
  };
  const back = (e) => {
    e.preventDefault();
    props.history.push("/");
  };
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.pageContent}>
          <Form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={4}></Grid>
              <Grid item md={12}>
                <div className={classes.title}>
                  <IconButton onClick={back}>
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>
                  <h1>Sign Up</h1>
                </div>

                <Controls.Input
                  label="Full Name"
                  name="fullName"
                  visibility="true"
                  value={values.fullName}
                  onChange={handleInputChange}
                  error={errors.fullName}
                />
                <Controls.Input
                  label="Email"
                  name="email"
                  value={values.email}
                  visibility="true"
                  onChange={handleInputChange}
                  error={errors.email}
                />
                <Controls.Input
                  label="Mobile"
                  visibility="true"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleInputChange}
                  error={errors.mobile}
                />
                <Controls.Input
                  label="City"
                  visibility="true"
                  name="city"
                  value={values.city}
                  onChange={handleInputChange}
                />
                <Controls.Input
                  label="Password"
                  visibility={showPassword}
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
                <Controls.Input
                  label="Re-type Password"
                  visibility={showPassword}
                  name="checkPassword"
                  value={values.checkPassword}
                  onChange={handleInputChange}
                  error={errors.checkPassword}
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
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default Register;
