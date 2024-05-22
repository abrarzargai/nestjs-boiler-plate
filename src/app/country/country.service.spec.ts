import { Test, TestingModule } from "@nestjs/testing";
import { CountryService } from "./country.service";
import { Country } from "./entities/country.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

class MockRepository<T>{
  save = jest.fn();
  count = jest.fn();
  find = jest.fn();
  findOneOrFail = jest.fn();
  update = jest.fn();
  delete = jest.fn();
  softDelete =jest.fn();
}

describe("CountryService", () => {
  let service: CountryService;
  let repository: MockRepository<Country>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService, {
          provide: getRepositoryToken(Country),
          useValue: MockRepository,
        }]
    }
    ).compile();

    service = module.get<CountryService>(CountryService);
    repository = module.get(getRepositoryToken(Country))
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
