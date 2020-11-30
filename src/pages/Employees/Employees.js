import { makeStyles, Paper } from "@material-ui/core";

import { PeopleOutlineTwoTone } from "@material-ui/icons";
import React from "react";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import SideMenu from "../../components/SideMenu/SideMenu";
import EmployeeForm from "./EmployeeForm";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  appMain: {
    paddingLeft: "250px",
    width: "100%",
  },
}));

function Employees(props) {
  const classes = useStyles();
  return (
    <>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <PageHeader
          title="New Employee"
          subtitle="Add new employee information"
          icon={<PeopleOutlineTwoTone fontSize="large" />}
        />
        <Paper className={classes.pageContent}>
          <EmployeeForm />
        </Paper>
      </div>
    </>
  );
}

export default Employees;
