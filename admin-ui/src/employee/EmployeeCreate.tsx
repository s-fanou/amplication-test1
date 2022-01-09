import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { DepartmentTitle } from "../department/DepartmentTitle";

export const EmployeeCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="department.id"
          reference="Department"
          label="Departments"
        >
          <SelectInput optionText={DepartmentTitle} />
        </ReferenceInput>
        <TextInput label="FirstName" source="firstName" />
        <TextInput label="LastName" source="lastName" />
      </SimpleForm>
    </Create>
  );
};
