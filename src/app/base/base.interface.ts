import { IFindAllBaseOptions } from './../interfaces/queryOptions.interfaces';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IFindByIdBaseOptions } from '../interfaces';
import { GenericObject, SuccessResponse } from '../types';

export interface IBaseService<T> {
  findByIdBase(id: string, options?: IFindByIdBaseOptions): Promise<T>;

  isExist(filters: GenericObject): Promise<T>;

  findOneBase(
    filters: GenericObject,
    options?: IFindByIdBaseOptions
  ): Promise<T>;

  findAllBase(
    filters: GenericObject,
    options?: IFindAllBaseOptions
  ): Promise<SuccessResponse | T[]>;

  createOneBase(data: T, options?: IFindByIdBaseOptions): Promise<T>;

  updateOneBase(
    id: string,
    data: QueryDeepPartialEntity<T>,
    options?: IFindByIdBaseOptions
  ): Promise<T>;

  deleteOneBase(id: string): Promise<SuccessResponse>;

  softDeleteOneBase(id: string): Promise<SuccessResponse>;

  recoverByIdBase(id: string, options?: IFindByIdBaseOptions): Promise<T>;
}
