import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryService } from "./country.service";
import { Country } from "./entities/country.entity";
import { CountryResolver } from "./country.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [],
  providers: [CountryResolver,CountryService],
})
export class CountryModule {}
