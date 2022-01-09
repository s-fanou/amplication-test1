import { EmployeeWhereUniqueInput } from "../employee/EmployeeWhereUniqueInput";

export type DepartmentUpdateInput = {
  deptId?: EmployeeWhereUniqueInput;
  description?: string | null;
  title?: string | null;
};
