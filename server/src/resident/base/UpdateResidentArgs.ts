import { ArgsType, Field } from "@nestjs/graphql";
import { ResidentWhereUniqueInput } from "./ResidentWhereUniqueInput";
import { ResidentUpdateInput } from "./ResidentUpdateInput";

@ArgsType()
class UpdateResidentArgs {
  @Field(() => ResidentWhereUniqueInput, { nullable: false })
  where!: ResidentWhereUniqueInput;
  @Field(() => ResidentUpdateInput, { nullable: false })
  data!: ResidentUpdateInput;
}

export { UpdateResidentArgs };
