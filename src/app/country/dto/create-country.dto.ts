import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";


@InputType()
export class CreateCountryDto {
  
  @Field()
  @MinLength(10)
  name: string
}
