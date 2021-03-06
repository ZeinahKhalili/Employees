import { Checkbox, FormControlLabel, FormGroup, Grid } from "@material-ui/core";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import React, { useEffect, useState } from "react";
import Controls from "../../components/Controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as employeeService from "../../services/employeeService";
const genderItems = [
  {
    id: "male",
    title: "Male",
  },
  {
    id: "female",
    title: "Female",
  },
  {
    id: "other",
    title: "Other",
  },
];

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermenant: false,
};

function EmployeeForm(props) {
  const {
    values,
    setValues,
    handleInputChange,
    errors,
    resetForm,
    validate,
  } = useForm(initialFValues, true);
  const { addOrEdit, recordForEdit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };
  useEffect(() => {
    if (recordForEdit != null) {
      setValues({ ...recordForEdit });
    }
  }, [recordForEdit]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item md={6}>
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
            name="mobile"
            value={values.mobile}
            visibility="true"
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            label="City"
            name="city"
            value={values.city}
            visibility="true"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item md={4}>
          <Controls.RadioGroup
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name="hireDate"
            onChange={handleInputChange}
            value={values.hireDate}
            label="Hire date"
          />
          <Controls.Checkbox
            name="checkedPermentant"
            onChange={handleInputChange}
            value={values.isPermenant}
            label="Permenant Employee"
            iconName="permenant"
          />
          <div>
            <Controls.Button text="Submit" type="submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default EmployeeForm;
