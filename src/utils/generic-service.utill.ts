import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from "typeorm";

@Injectable()
export class GenericService<T> {
  constructor(
    @InjectRepository()
    private readonly repository: Repository<T>,
  ) {}

  create(createDto: any): Promise<T> {
    return this.repository.save(createDto);
  }

  findAll(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  update(options: FindOptionsWhere<T>, updateDto: any): Promise<UpdateResult> {
    return this.repository.update(options, updateDto);
  }

  remove(options: FindOptionsWhere<T>): Promise<UpdateResult> {
    return this.repository.softDelete(options);
  }
}
