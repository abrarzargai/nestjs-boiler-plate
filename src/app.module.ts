import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ZodValidationPipe } from "nestjs-zod";
import { CountryModule } from "./app/country/country.module";
import { UserModule } from "./app/user/user.module";
import { databaseConfigs } from "./config/database.config";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    //for .env file
    ConfigModule.forRoot(),
    //typeorm configuration
    TypeOrmModule.forRoot(databaseConfigs),
    //graphQL   configurations:
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile:join(process.cwd(), 'src/schema.gql'),
    }),
    // App Modules
    CountryModule,
    // UserModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
