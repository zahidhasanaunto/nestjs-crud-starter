import { BaseEntity } from '@src/app/base';
import { ENUM_TABLE_NAMES } from '@src/shared';
import { Column, Entity } from 'typeorm';

@Entity(ENUM_TABLE_NAMES.ROLES, { orderBy: { createdAt: 'DESC' } })
export class Role extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = ['title'];

  @Column()
  title?: string;

  isAlreadyAdded?: boolean = false;

  constructor() {
    super();
  }
}
