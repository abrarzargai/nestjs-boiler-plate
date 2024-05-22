import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericService } from "@utils/generic-service.utill";
import { Country } from "./entities/country.entity";

@Injectable()
export class CountryService extends GenericService<Country> {
  constructor(@InjectRepository(Country) private readonly countryRepository: Repository<Country>) {
    super(countryRepository);
  }
}
