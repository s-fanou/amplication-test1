import { EmployeeWhereUniqueInput } from "../employee/EmployeeWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type DepartmentWhereInput = {
  deptId?: EmployeeWhereUniqueInput;
  description?: StringNullableFilter;
  id?: StringFilter;
  title?: StringNullableFilter;
};
