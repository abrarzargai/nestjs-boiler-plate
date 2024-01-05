import { UpdateResult } from 'typeorm';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    create(createCountryDto: CreateCountryDto): Promise<Country>;
    findAll(): Promise<Country[]>;
    findOne(id: string): Promise<Country>;
    update(id: string, updateCountryDto: UpdateCountryDto): Promise<UpdateResult>;
    remove(id: string): Promise<UpdateResult>;
}
