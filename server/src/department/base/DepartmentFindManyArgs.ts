import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DepartmentWhereInput } from "./DepartmentWhereInput";
import { Type } from "class-transformer";
import { DepartmentOrderByInput } from "./DepartmentOrderByInput";

@ArgsType()
class DepartmentFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => DepartmentWhereInput,
  })
  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;

  @ApiProperty({
    required: false,
    type: DepartmentOrderByInput,
  })
  @Field(() => DepartmentOrderByInput, { nullable: true })
  @Type(() => DepartmentOrderByInput)
  orderBy?: DepartmentOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { DepartmentFindManyArgs };
