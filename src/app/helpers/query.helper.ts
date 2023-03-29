import { Injectable } from '@nestjs/common';
import { IFindAllBaseOptions } from '@src/app/interfaces';
import { toNumber } from '@src/shared';
import { isUUID } from 'class-validator';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class QueryHelper {
  constructor() {}

  public async buildSearchFilter<T>(
    filters: any,
    options: IFindAllBaseOptions,
    _repo: Repository<T>
  ): Promise<{
    findManyOptions: FindManyOptions<T>;
    take: number;
    skip: number;
    page: number;
  }> {
    let { searchTerm, limit: take, page, ...queryOptions } = filters;
    take = toNumber(take) || 10;
    page = toNumber(page) || 1;
    const skip = (page - 1) * take;

    if (searchTerm && _repo.target.valueOf().hasOwnProperty('SEARCH_TERMS')) {
      let SEARCH_TERMS = (_repo.target.valueOf() as any).SEARCH_TERMS || [];

      if (Object.keys(queryOptions).length) {
        SEARCH_TERMS = SEARCH_TERMS.filter(
          (term) => !term.includes(Object.keys(queryOptions))
        );
      }

      const where = [];

      for (const term of SEARCH_TERMS) {
        where.push({
          ...queryOptions,
          [term]: ILike(`%${searchTerm}%`),
        });
      }

      const findManyOptions: FindManyOptions<T> = {
        where,
      };

      findManyOptions.skip = skip;
      findManyOptions.take = take;
      findManyOptions.relations = options?.relations || [];

      return { findManyOptions, take, page, skip };
    } else {
      const relations = _repo.metadata.relations.map((r) => r.propertyName);

      Object.keys(queryOptions).forEach((key) => {
        if (relations.includes(key) && isUUID(queryOptions[key])) {
          queryOptions[key] = {
            id: queryOptions[key],
          };
        }
      });

      const findManyOptions: FindManyOptions<T> = {
        where: queryOptions as FindOptionsWhere<T>,
      };

      findManyOptions.skip = skip;
      findManyOptions.take = take;
      findManyOptions.relations = options?.relations || [];

      return { findManyOptions, take, page, skip };
    }
  }
}
