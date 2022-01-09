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
import { CreateResidentArgs } from "./CreateResidentArgs";
import { UpdateResidentArgs } from "./UpdateResidentArgs";
import { DeleteResidentArgs } from "./DeleteResidentArgs";
import { ResidentFindManyArgs } from "./ResidentFindManyArgs";
import { ResidentFindUniqueArgs } from "./ResidentFindUniqueArgs";
import { Resident } from "./Resident";
import { ResidentService } from "../resident.service";

@graphql.Resolver(() => Resident)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ResidentResolverBase {
  constructor(
    protected readonly service: ResidentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Resident",
    action: "read",
    possession: "any",
  })
  async _residentsMeta(
    @graphql.Args() args: ResidentFindManyArgs
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

  @graphql.Query(() => [Resident])
  @nestAccessControl.UseRoles({
    resource: "Resident",
    action: "read",
    possession: "any",
  })
  async residents(
    @graphql.Args() args: ResidentFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Resident[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Resident",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Resident, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Resident",
    action: "read",
    possession: "own",
  })
  async resident(
    @graphql.Args() args: ResidentFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Resident | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Resident",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Resident)
  @nestAccessControl.UseRoles({
    resource: "Resident",
    action: "create",
    possession: "any",
  })
  async createResident(
    @graphql.Args() args: CreateResidentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Resident> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Resident",
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
        `providing the properties: ${properties} on ${"Resident"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Resident)
  @nestAccessControl.UseRoles({
    resource: "Resident",
    action: "update",
    possession: "any",
  })
  async updateResident(
    @graphql.Args() args: UpdateResidentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Resident | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Resident",
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
        `providing the properties: ${properties} on ${"Resident"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => Resident)
  @nestAccessControl.UseRoles({
    resource: "Resident",
    action: "delete",
    possession: "any",
  })
  async deleteResident(
    @graphql.Args() args: DeleteResidentArgs
  ): Promise<Resident | null> {
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
}
