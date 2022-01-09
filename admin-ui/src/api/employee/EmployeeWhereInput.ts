import { DepartmentWhereUniqueInput } from "../department/DepartmentWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type EmployeeWhereInput = {
  departments?: DepartmentWhereUniqueInput;
  firstName?: StringNullableFilter;
  id?: StringFilter;
  lastName?: StringNullableFilter;
};
