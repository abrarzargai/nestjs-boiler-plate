import { Field, InputType } from "@nestjs/graphql";
@InputType() //decorator marks the class as an input type for GraphQL
export class UpdateCountryDto  {
      
  @Field()
  name: string
}
