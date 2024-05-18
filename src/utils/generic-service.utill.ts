import {
  DeleteResult, FindManyOptions,
  FindOneOptions, FindOptionsWhere,
  ObjectLiteral, Repository, UpdateResult
} from 'typeorm';

export class GenericService<T extends ObjectLiteral> {
  constructor(private readonly entityRepository: Repository<T>) {}

  create(createDto: any): Promise<T> {
    return this.entityRepository.save(createDto);
  }

  count(options: FindManyOptions<T>): Promise<number> {
    return this.entityRepository.count(options);
  }

  findAll(options: FindManyOptions<T>): Promise<T[]> {
    return this.entityRepository.find(options);
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.entityRepository.findOneOrFail(options);
  }

  update(options: FindOptionsWhere<T>, updateDto: any): Promise<UpdateResult> {
    return this.entityRepository.update(options, updateDto);
  }

  remove(options: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.entityRepository.delete(options);
  }

  softDelete(options: FindOptionsWhere<T>): Promise<UpdateResult> {
    return this.entityRepository.softDelete(options);
  }
}
