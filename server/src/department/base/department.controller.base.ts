import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { DepartmentService } from "../department.service";
import { DepartmentCreateInput } from "./DepartmentCreateInput";
import { DepartmentWhereInput } from "./DepartmentWhereInput";
import { DepartmentWhereUniqueInput } from "./DepartmentWhereUniqueInput";
import { DepartmentFindManyArgs } from "./DepartmentFindManyArgs";
import { DepartmentUpdateInput } from "./DepartmentUpdateInput";
import { Department } from "./Department";
@swagger.ApiBearerAuth()
export class DepartmentControllerBase {
  constructor(
    protected readonly service: DepartmentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Department })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: DepartmentCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Department> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Department",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Department"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        deptId: {
          connect: data.deptId,
        },
      },
      select: {
        createdAt: true,

        deptId: {
          select: {
            id: true,
          },
        },

        description: true,
        id: true,
        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Department] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => DepartmentFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Department[]> {
    const args = plainToClass(DepartmentFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Department",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,

        deptId: {
          select: {
            id: true,
          },
        },

        description: true,
        id: true,
        title: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Department })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: DepartmentWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Department | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Department",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,

        deptId: {
          select: {
            id: true,
          },
        },

        description: true,
        id: true,
        title: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Department })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: DepartmentWhereUniqueInput,
    @common.Body()
    data: DepartmentUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Department | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Department",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Department"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          deptId: {
            connect: data.deptId,
          },
        },
        select: {
          createdAt: true,

          deptId: {
            select: {
              id: true,
            },
          },

          description: true,
          id: true,
          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Department",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Department })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: DepartmentWhereUniqueInput
  ): Promise<Department | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,

          deptId: {
            select: {
              id: true,
            },
          },

          description: true,
          id: true,
          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
