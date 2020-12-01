import { makeStyles } from "@material-ui/core";
import React from "react";
import Controls from "../components/Controls/Controls";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(30),
  },
  text: {
    padding: theme.spacing(3),
    fontSize: theme.spacing(5),
  },
}));

function Home(props) {
  const classes = useStyles();

  const navigate = (path) => {
    props.history.push(path);
  };

  return (
    <div className={classes.main}>
      <Controls.Button
        text="Login"
        className={classes.text}
        onClick={navigate("/login")}
      />
      <Controls.Button
        text="Sign up"
        className={classes.text}
        onClick={navigate("/signup")}
      />
    </div>
  );
}

export default Home;
