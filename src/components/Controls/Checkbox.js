import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  FormGroup,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
const useStyles = makeStyles((theme) => ({
  root: { marginLeft: theme.spacing(1) },
}));
function Checkbox(props) {
  const { name, label, onChange, value, iconName } = props;
  const classes = useStyles();
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            icon={
              iconName == "permenant" ? (
                <AllInclusiveIcon />
              ) : (
                <VisibilityOffIcon />
              )
            }
            checkedIcon={
              iconName == "permenant" ? (
                <AllInclusiveIcon />
              ) : (
                <VisibilityIcon />
              )
            }
            name={name}
            value={value}
            onChange={onChange}
            classes={{ root: classes.root }}
          />
        }
        label={label}
      />
    </FormControl>
  );
}

export default Checkbox;
