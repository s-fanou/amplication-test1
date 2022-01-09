import { ArgsType, Field } from "@nestjs/graphql";
import { ResidentWhereUniqueInput } from "./ResidentWhereUniqueInput";

@ArgsType()
class ResidentFindUniqueArgs {
  @Field(() => ResidentWhereUniqueInput, { nullable: false })
  where!: ResidentWhereUniqueInput;
}

export { ResidentFindUniqueArgs };
