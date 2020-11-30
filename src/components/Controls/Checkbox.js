import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  FormGroup,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";

const useStyles = makeStyles((theme) => ({
  root: { marginLeft: theme.spacing(1) },
}));
function Checkbox(props) {
  const { name, label, onChange, value } = props;
  const classes = useStyles();
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MuiCheckbox
            icon={<AllInclusiveIcon />}
            checkedIcon={<AllInclusiveIcon />}
            name={name}
            value={value}
            onChange={onChange}
            classes={{ root: classes.root }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}

export default Checkbox;
