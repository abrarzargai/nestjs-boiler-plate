import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
export declare class CountryService {
    private readonly countryEntity;
    constructor(countryEntity: Repository<Country>);
    create(createCountryDto: CreateCountryDto): Promise<Country>;
    findAll(options: FindManyOptions<Country>): Promise<Country[]>;
    findOne(options: FindOneOptions<Country>): Promise<Country>;
    update(options: FindOptionsWhere<Country>, updateCountryDto: UpdateCountryDto): Promise<UpdateResult>;
    remove(options: FindOptionsWhere<Country>): Promise<UpdateResult>;
}
