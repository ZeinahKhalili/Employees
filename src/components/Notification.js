import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

function Notification(props) {
  const { notify, setNotify } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  const classes = useStyles();
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      className={classes.root}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
