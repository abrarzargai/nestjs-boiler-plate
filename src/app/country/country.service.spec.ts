import { Test, TestingModule } from "@nestjs/testing";
import { CountryService } from "./country.service";
import { Country } from "./entities/country.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DeleteResult, FindManyOptions, FindOptionsWhere, UpdateResult } from "typeorm";
import { CreateCountryDto } from "./dto/create-country.dto";
import { mock } from "node:test";

class MockRepository<T> {
  save = jest.fn();
  count = jest.fn();
  find = jest.fn();
  findOneOrFail = jest.fn();
  update = jest.fn();
  delete = jest.fn();
  softDelete = jest.fn();
}

describe("CountryService", () => {
  let service: CountryService;
  let repository: MockRepository<Country>;
  const mockValue: Country = {
    id: "9f2c0379-e945-4476-bbfd-9a52588180b8",
    name: 'Mock Country',
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
  }
  const createCountryDto: CreateCountryDto = {
    name: "Mock Country"
  }
  const updateResult: UpdateResult = {
    affected: 1,
    raw: undefined,
    generatedMaps: []
  };
  const deleteResult: DeleteResult = {
    affected: 1,
    raw: undefined
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService, {
          provide: getRepositoryToken(Country),
          useClass: MockRepository,
        }]
    }).compile();

    service = module.get<CountryService>(CountryService);
    repository = module.get(getRepositoryToken(Country));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new country record', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockValue);
      const response = await repository.save(createCountryDto)

      expect(repository.save).toHaveBeenLastCalledWith(createCountryDto)
      expect(response).toEqual(mockValue)
    })
  })

  describe('count', () => {
    it('should return count of total records', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(1)

      const options: FindManyOptions<Country> = { where: { id: mockValue.id } }
      const response = await repository.count(options)

      expect(response).toEqual(1)
      expect(repository.count).toHaveBeenCalledWith(options)
    })
  })

  describe('find', () => {
    it('should return a list of country entities', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([mockValue])

      const options: FindManyOptions<Country> = { where: { id: mockValue.id } }
      const response = await repository.find(options)

      expect(response).toEqual([mockValue])
      expect(repository.find).toHaveBeenCalledWith(options)
    })
  })

  describe('update', () => {
    it('should return update result for a country entity', async () => {
      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateResult)
      const options: FindOptionsWhere<Country> = { id: mockValue.id };

      const response = await repository.update(options);

      expect(repository.update).toHaveBeenCalledWith(options);
      expect(response).toEqual(updateResult)
    })
  })

  describe('softDelete', () => {
    it('should return update result for a soft deleted country entity', async () => {
      jest.spyOn(repository, 'softDelete').mockResolvedValueOnce(updateResult)
      const options: FindOptionsWhere<Country> = { id: mockValue.id };

      const response = await repository.softDelete(options);

      expect(repository.softDelete).toHaveBeenCalledWith(options);
      expect(response).toEqual(updateResult)
    })
  })

  describe('Delete', () => {
    it('should return delete result for a country entity', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValueOnce(deleteResult)
      const options: FindOptionsWhere<Country> = { id: mockValue.id };

      const response = await repository.delete(options);

      expect(repository.delete).toHaveBeenCalledWith(options);
      expect(response).toEqual(deleteResult)
    })
  })

  describe('findOneOrFail', () => {
    it('should find and return a country record by Id', async () => {
      jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(mockValue);

      const options: FindManyOptions<Country> = { where: { id: mockValue.id } }
      const response = await repository.findOneOrFail(options)
      expect(repository.findOneOrFail).toBeCalledWith(options)
      expect(response).toEqual(mockValue)

    })
    it('should throw an error if country record not found', async () => {
      const error = new Error("not found");

      jest.spyOn(repository, 'findOneOrFail').mockRejectedValueOnce(error)
      const options: FindManyOptions<Country> = { where: { id: mockValue.id } }
      await expect(repository.findOneOrFail(options)).rejects.toThrow(error);
      expect(repository.findOneOrFail).toBeCalledWith(options)
    })
  })
});
