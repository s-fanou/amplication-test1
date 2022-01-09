import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ResidentWhereInput } from "./ResidentWhereInput";
import { Type } from "class-transformer";
import { ResidentOrderByInput } from "./ResidentOrderByInput";

@ArgsType()
class ResidentFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ResidentWhereInput,
  })
  @Field(() => ResidentWhereInput, { nullable: true })
  @Type(() => ResidentWhereInput)
  where?: ResidentWhereInput;

  @ApiProperty({
    required: false,
    type: ResidentOrderByInput,
  })
  @Field(() => ResidentOrderByInput, { nullable: true })
  @Type(() => ResidentOrderByInput)
  orderBy?: ResidentOrderByInput;

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

export { ResidentFindManyArgs };
