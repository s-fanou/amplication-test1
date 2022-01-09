import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { DepartmentTitle } from "../department/DepartmentTitle";

export const EmployeeEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
