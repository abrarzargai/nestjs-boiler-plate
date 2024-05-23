import { Test, TestingModule } from "@nestjs/testing";
import { CountryService } from "./country.service";
import { Country } from "./entities/country.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { FindManyOptions } from "typeorm";

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
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService, {
          provide: getRepositoryToken(Country),
          useValue: MockRepository,
        }]
    }).compile();

    service = module.get<CountryService>(CountryService);
    repository = module.get(getRepositoryToken(Country));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findOne', () => {
    it('Should find and return a record for Id', async () => {
      jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(mockValue);

      const options: FindManyOptions<Country> = { where: { id: mockValue.id } }
      const response = await repository.findOneOrFail(options)
      expect(response).toBeCalledWith(options)
      expect(response).toBeCalledWith(mockValue)

    })
  })
});
