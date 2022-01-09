import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const ResidentCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="FirstName" source="firstName" />
        <TextInput label="LastName" source="lastName" />
      </SimpleForm>
    </Create>
  );
};
