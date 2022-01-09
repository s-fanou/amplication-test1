import { Employee } from "../employee/Employee";

export type Department = {
  createdAt: Date;
  deptId?: Employee;
  description: string | null;
  id: string;
  title: string | null;
  updatedAt: Date;
};
