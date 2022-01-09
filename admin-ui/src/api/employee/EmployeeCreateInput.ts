import { DepartmentWhereUniqueInput } from "../department/DepartmentWhereUniqueInput";

export type EmployeeCreateInput = {
  departments?: DepartmentWhereUniqueInput;
  firstName?: string | null;
  lastName?: string | null;
};
