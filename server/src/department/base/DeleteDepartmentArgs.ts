import { ArgsType, Field } from "@nestjs/graphql";
import { DepartmentWhereUniqueInput } from "./DepartmentWhereUniqueInput";

@ArgsType()
class DeleteDepartmentArgs {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  where!: DepartmentWhereUniqueInput;
}

export { DeleteDepartmentArgs };
