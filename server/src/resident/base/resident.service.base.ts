import { PrismaService } from "nestjs-prisma";
import { Prisma, Resident } from "@prisma/client";

export class ResidentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ResidentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ResidentFindManyArgs>
  ): Promise<number> {
    return this.prisma.resident.count(args);
  }

  async findMany<T extends Prisma.ResidentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ResidentFindManyArgs>
  ): Promise<Resident[]> {
    return this.prisma.resident.findMany(args);
  }
  async findOne<T extends Prisma.ResidentFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ResidentFindUniqueArgs>
  ): Promise<Resident | null> {
    return this.prisma.resident.findUnique(args);
  }
  async create<T extends Prisma.ResidentCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ResidentCreateArgs>
  ): Promise<Resident> {
    return this.prisma.resident.create<T>(args);
  }
  async update<T extends Prisma.ResidentUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ResidentUpdateArgs>
  ): Promise<Resident> {
    return this.prisma.resident.update<T>(args);
  }
  async delete<T extends Prisma.ResidentDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ResidentDeleteArgs>
  ): Promise<Resident> {
    return this.prisma.resident.delete(args);
  }
}
