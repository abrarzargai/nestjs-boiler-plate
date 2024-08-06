import { Field, ID, ObjectType } from "@nestjs/graphql";
import { baseEntity } from "../../../utils/baseEntity";
import { Column, Entity, PrimaryGeneratedColumn, UpdateResult } from "typeorm";

@Entity('country')
@ObjectType('country') // decorator helps define the schema for GraphQL for code first approch 
export class Country extends baseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name: string;
}