import {
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

import { PeopleOutlineTwoTone } from "@material-ui/icons";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import SideMenu from "../../components/SideMenu/SideMenu";
import useTable from "../../components/useTable";
import EmployeeForm from "./EmployeeForm";
import * as employeeService from "../../services/employeeService";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  appMain: {
    paddingLeft: "250px",
    width: "100%",
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));
const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department" },
];

function Employees(props) {
  const classes = useStyles();
  const [records, setRecords] = useState(employeeService.getAllEmployees);
  const { TblContainer, TblHead } = useTable(records, headCells);
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
          <TblContainer>
            <TblHead />
            <TableBody>
              {records.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
        </Paper>
      </div>
    </>
  );
}

export default Employees;
