import { Module } from "@nestjs/common";
import { ResidentModuleBase } from "./base/resident.module.base";
import { ResidentService } from "./resident.service";
import { ResidentController } from "./resident.controller";
import { ResidentResolver } from "./resident.resolver";

@Module({
  imports: [ResidentModuleBase],
  controllers: [ResidentController],
  providers: [ResidentService, ResidentResolver],
  exports: [ResidentService],
})
export class ResidentModule {}
