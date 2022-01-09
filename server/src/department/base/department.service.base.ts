import { PrismaService } from "nestjs-prisma";
import { Prisma, Department, Employee } from "@prisma/client";

export class DepartmentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.DepartmentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DepartmentFindManyArgs>
  ): Promise<number> {
    return this.prisma.department.count(args);
  }

  async findMany<T extends Prisma.DepartmentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DepartmentFindManyArgs>
  ): Promise<Department[]> {
    return this.prisma.department.findMany(args);
  }
  async findOne<T extends Prisma.DepartmentFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.DepartmentFindUniqueArgs>
  ): Promise<Department | null> {
    return this.prisma.department.findUnique(args);
  }
  async create<T extends Prisma.DepartmentCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DepartmentCreateArgs>
  ): Promise<Department> {
    return this.prisma.department.create<T>(args);
  }
  async update<T extends Prisma.DepartmentUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DepartmentUpdateArgs>
  ): Promise<Department> {
    return this.prisma.department.update<T>(args);
  }
  async delete<T extends Prisma.DepartmentDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.DepartmentDeleteArgs>
  ): Promise<Department> {
    return this.prisma.department.delete(args);
  }

  async getDeptId(parentId: string): Promise<Employee | null> {
    return this.prisma.department
      .findUnique({
        where: { id: parentId },
      })
      .deptId();
  }
}
