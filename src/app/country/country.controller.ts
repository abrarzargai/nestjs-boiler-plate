import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { API_OPERATIONS } from "src/common/constants/api-operation-details";
import { UpdateResult } from "typeorm";
import { CountryService } from "./country.service";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { Country } from "./entities/country.entity";

@Controller("country")
@ApiTags("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation(API_OPERATIONS.DEFAULT.CREATE)
  create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryService.create(createCountryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation(API_OPERATIONS.DEFAULT.FIND_ALL)
  findAll(): Promise<Country[]> {
    return this.countryService.findAll({});
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation(API_OPERATIONS.DEFAULT.FIND_ONE)
  findOne(@Param("id") id: string): Promise<Country> {
    return this.countryService.findOne({ where: { id } });
  }

  @Patch(":id")
  @ApiOperation(API_OPERATIONS.DEFAULT.UPDATE)
  @HttpCode(HttpStatus.OK)
  update(
    @Param("id") id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<UpdateResult> {
    return this.countryService.update({ id }, updateCountryDto);
  }

  @Delete(":id")
  @ApiOperation(API_OPERATIONS.DEFAULT.SOFT_REMOVE)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string): Promise<UpdateResult> {
    return this.countryService.softDelete({ id });
  }
}
