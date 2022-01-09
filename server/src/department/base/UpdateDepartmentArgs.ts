import { ArgsType, Field } from "@nestjs/graphql";
import { DepartmentWhereUniqueInput } from "./DepartmentWhereUniqueInput";
import { DepartmentUpdateInput } from "./DepartmentUpdateInput";

@ArgsType()
class UpdateDepartmentArgs {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  where!: DepartmentWhereUniqueInput;
  @Field(() => DepartmentUpdateInput, { nullable: false })
  data!: DepartmentUpdateInput;
}

export { UpdateDepartmentArgs };
