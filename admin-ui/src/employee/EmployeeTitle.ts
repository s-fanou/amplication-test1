import { Employee as TEmployee } from "../api/employee/Employee";

export const EMPLOYEE_TITLE_FIELD = "firstName";

export const EmployeeTitle = (record: TEmployee): string => {
  return record.firstName || record.id;
};
