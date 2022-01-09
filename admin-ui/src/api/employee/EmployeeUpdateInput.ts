import { DepartmentWhereUniqueInput } from "../department/DepartmentWhereUniqueInput";

export type EmployeeUpdateInput = {
  departments?: DepartmentWhereUniqueInput;
  firstName?: string | null;
  lastName?: string | null;
};
