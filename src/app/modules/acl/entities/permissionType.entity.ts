import { BaseEntity } from '@src/app/base';
import { ENUM_TABLE_NAMES } from '@src/shared';
import { Column, Entity } from 'typeorm';

@Entity(ENUM_TABLE_NAMES.PERMISSION_TYPES, { orderBy: { createdAt: 'DESC' } })
export class PermissionType extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = ['title'];

  @Column()
  title?: string;

  constructor() {
    super();
  }
}
