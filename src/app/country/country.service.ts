import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Country } from "./entities/country.entity";
import { GenericService } from "src/utils/generic-service.utill";

@Injectable()
export class CountryService extends GenericService<Country> {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {
    super(countryRepository);
  }
}
