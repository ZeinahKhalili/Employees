import { makeStyles, withStyles } from "@material-ui/core";
import React from "react";

const styles = {
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0",
    width: "250px",
    height: "1200px",
    backgroundColor: "#253053",
  },
};

const SideMenu = (props) => {
  const { classes } = props;

  return <div className={classes.sideMenu}></div>;
};

export default withStyles(styles)(SideMenu);
