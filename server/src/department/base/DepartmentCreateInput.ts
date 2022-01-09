import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EmployeeWhereUniqueInput } from "../../employee/base/EmployeeWhereUniqueInput";
import { ValidateNested, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class DepartmentCreateInput {
  @ApiProperty({
    required: true,
    type: () => EmployeeWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => EmployeeWhereUniqueInput)
  @Field(() => EmployeeWhereUniqueInput)
  deptId!: EmployeeWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  title?: string | null;
}
export { DepartmentCreateInput };
