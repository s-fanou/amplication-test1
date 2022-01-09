import { EmployeeWhereUniqueInput } from "../employee/EmployeeWhereUniqueInput";

export type DepartmentCreateInput = {
  deptId: EmployeeWhereUniqueInput;
  description?: string | null;
  title?: string | null;
};
