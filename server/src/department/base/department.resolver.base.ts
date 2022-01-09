import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateDepartmentArgs } from "./CreateDepartmentArgs";
import { UpdateDepartmentArgs } from "./UpdateDepartmentArgs";
import { DeleteDepartmentArgs } from "./DeleteDepartmentArgs";
import { DepartmentFindManyArgs } from "./DepartmentFindManyArgs";
import { DepartmentFindUniqueArgs } from "./DepartmentFindUniqueArgs";
import { Department } from "./Department";
import { Employee } from "../../employee/base/Employee";
import { DepartmentService } from "../department.service";

@graphql.Resolver(() => Department)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class DepartmentResolverBase {
  constructor(
    protected readonly service: DepartmentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "read",
    possession: "any",
  })
  async _departmentsMeta(
    @graphql.Args() args: DepartmentFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Department])
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "read",
    possession: "any",
  })
  async departments(
    @graphql.Args() args: DepartmentFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Department[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Department",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Department, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "read",
    possession: "own",
  })
  async department(
    @graphql.Args() args: DepartmentFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Department | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Department",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Department)
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "create",
    possession: "any",
  })
  async createDepartment(
    @graphql.Args() args: CreateDepartmentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Department> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Department",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Department"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        deptId: {
          connect: args.data.deptId,
        },
      },
    });
  }

  @graphql.Mutation(() => Department)
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "update",
    possession: "any",
  })
  async updateDepartment(
    @graphql.Args() args: UpdateDepartmentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Department | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Department",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Department"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          deptId: {
            connect: args.data.deptId,
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Department)
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "delete",
    possession: "any",
  })
  async deleteDepartment(
    @graphql.Args() args: DeleteDepartmentArgs
  ): Promise<Department | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Employee, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "read",
    possession: "any",
  })
  async deptId(
    @graphql.Parent() parent: Department,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Employee | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Employee",
    });
    const result = await this.service.getDeptId(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
