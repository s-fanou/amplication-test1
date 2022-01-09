import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { EmployeeTitle } from "../employee/EmployeeTitle";

export const DepartmentEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
