import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ResidentResolverBase } from "./base/resident.resolver.base";
import { Resident } from "./base/Resident";
import { ResidentService } from "./resident.service";

@graphql.Resolver(() => Resident)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ResidentResolver extends ResidentResolverBase {
  constructor(
    protected readonly service: ResidentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
