import { ArgsType, Field } from "@nestjs/graphql";
import { DepartmentWhereUniqueInput } from "./DepartmentWhereUniqueInput";

@ArgsType()
class DepartmentFindUniqueArgs {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  where!: DepartmentWhereUniqueInput;
}

export { DepartmentFindUniqueArgs };
