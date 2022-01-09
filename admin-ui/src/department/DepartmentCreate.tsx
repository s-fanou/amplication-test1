import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { EmployeeTitle } from "../employee/EmployeeTitle";

export const DepartmentCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="employee.id"
          reference="Employee"
          label="DeptId"
        >
          <SelectInput optionText={EmployeeTitle} />
        </ReferenceInput>
        <TextInput label="description" multiline source="description" />
        <TextInput label="title" source="title" />
      </SimpleForm>
    </Create>
  );
};
