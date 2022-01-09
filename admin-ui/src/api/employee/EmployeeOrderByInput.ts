import { SortOrder } from "../../util/SortOrder";

export type EmployeeOrderByInput = {
  createdAt?: SortOrder;
  departmentsId?: SortOrder;
  firstName?: SortOrder;
  id?: SortOrder;
  lastName?: SortOrder;
  updatedAt?: SortOrder;
};
