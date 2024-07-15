import { Test, TestingModule } from "@nestjs/testing";
import { DeleteResult, FindManyOptions, FindOptionsWhere, UpdateResult } from "typeorm";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";
import { CreateCountryDto } from "./dto/create-country.dto";
import { Country } from "./entities/country.entity";

jest.mock('../../common/constants/api-operation-details');

class MockCountryService {
  create = jest.fn();
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  softDelete = jest.fn();
}

const mockCountry: Country = {
  id: "9f2c0379-e945-4476-bbfd-9a52588180b8",
  name: 'Mock Country',
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1,
};

const createCountryDto: CreateCountryDto = {
  name: "Mock Country",
};

const updateResult: UpdateResult = {
  affected: 1,
  raw: undefined,
  generatedMaps: [],
};

describe("CountryController", () => {
  let controller: CountryController;
  let service: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [{
        provide: CountryService,
        useClass: MockCountryService,
      }],
    }).compile();

    controller = module.get<CountryController>(CountryController);
    service = module.get<CountryService>(CountryService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a new country record', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(mockCountry);

      const response = await controller.create(createCountryDto);

      expect(service.create).toHaveBeenCalledWith(createCountryDto);
      expect(response).toEqual(mockCountry);
    });
  });

  describe('findAll', () => {
    it('should return a list of country entities', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([mockCountry]);

      const response = await controller.findAll();

      expect(response).toEqual([mockCountry]);
    });
  });

  describe('update', () => {
    it('should return the update result for a country entity', async () => {
      const updateDto = { name: "Updated Country" };
      jest.spyOn(service, 'update').mockResolvedValueOnce(updateResult);
      const options: FindOptionsWhere<Country> = { id: mockCountry.id };

      const response = await controller.update(mockCountry.id, updateDto);

      expect(service.update).toHaveBeenCalledWith(options, updateDto);
      expect(response).toEqual(updateResult);
    });
  });

  describe('softDelete', () => {
    it('should return the result of soft deleting a country entity', async () => {
      jest.spyOn(service, 'softDelete').mockResolvedValueOnce(updateResult);
      const options: FindOptionsWhere<Country> = { id: mockCountry.id };

      const response = await controller.remove(mockCountry.id);

      expect(service.softDelete).toHaveBeenCalledWith(options);
      expect(response).toEqual(updateResult);
    });
  });

  describe('findOne', () => {
    it('should find and return a country record by ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCountry);

      const response = await controller.findOne(mockCountry.id);
      const options: FindManyOptions<Country> = { where: { id: mockCountry.id } };

      expect(service.findOne).toHaveBeenCalledWith(options);
      expect(response).toEqual(mockCountry);
    });

    it('should throw an error if the country record is not found', async () => {
      const error = new Error("not found");
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(error);

      await expect(controller.findOne(mockCountry.id)).rejects.toThrow(error);
      const options: FindManyOptions<Country> = { where: { id: mockCountry.id } };
      expect(service.findOne).toHaveBeenCalledWith(options);
    });
  });
});
