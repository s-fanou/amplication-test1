import { ArgsType, Field } from "@nestjs/graphql";
import { DepartmentCreateInput } from "./DepartmentCreateInput";

@ArgsType()
class CreateDepartmentArgs {
  @Field(() => DepartmentCreateInput, { nullable: false })
  data!: DepartmentCreateInput;
}

export { CreateDepartmentArgs };
