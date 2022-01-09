import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DepartmentWhereUniqueInput } from "../../department/base/DepartmentWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class EmployeeCreateInput {
  @ApiProperty({
    required: false,
    type: () => DepartmentWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DepartmentWhereUniqueInput)
  @IsOptional()
  @Field(() => DepartmentWhereUniqueInput, {
    nullable: true,
  })
  departments?: DepartmentWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  firstName?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  lastName?: string | null;
}
export { EmployeeCreateInput };
