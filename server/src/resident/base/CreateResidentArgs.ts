import { ArgsType, Field } from "@nestjs/graphql";
import { ResidentCreateInput } from "./ResidentCreateInput";

@ArgsType()
class CreateResidentArgs {
  @Field(() => ResidentCreateInput, { nullable: false })
  data!: ResidentCreateInput;
}

export { CreateResidentArgs };
