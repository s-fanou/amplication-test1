import { Department as TDepartment } from "../api/department/Department";

export const DEPARTMENT_TITLE_FIELD = "title";

export const DepartmentTitle = (record: TDepartment): string => {
  return record.title || record.id;
};
