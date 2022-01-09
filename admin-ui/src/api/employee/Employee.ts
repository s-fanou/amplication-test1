import { Department } from "../department/Department";

export type Employee = {
  createdAt: Date;
  departments?: Department;
  firstName: string | null;
  id: string;
  lastName: string | null;
  updatedAt: Date;
};
