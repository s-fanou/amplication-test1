import { ArgsType, Field } from "@nestjs/graphql";
import { ResidentWhereUniqueInput } from "./ResidentWhereUniqueInput";

@ArgsType()
class DeleteResidentArgs {
  @Field(() => ResidentWhereUniqueInput, { nullable: false })
  where!: ResidentWhereUniqueInput;
}

export { DeleteResidentArgs };
