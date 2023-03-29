import { BaseEntity } from '@src/app/base';
import { ENUM_TABLE_NAMES } from '@src/shared';
import { Type } from 'class-transformer';
import { Entity, ManyToOne, RelationId } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity(ENUM_TABLE_NAMES.ROLE_PERMISSIONS, { orderBy: { createdAt: 'DESC' } })
export class RolePermission extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = [];

  @ManyToOne((t) => Role, { onDelete: 'CASCADE' })
  @Type((t) => Role)
  role?: Role;

  @RelationId((e: RolePermission) => e.role)
  roleId?: string;

  @ManyToOne((t) => Permission, { onDelete: 'CASCADE' })
  @Type((t) => Permission)
  permission?: Permission;

  @RelationId((e: RolePermission) => e.permission)
  permissionId?: string;

  constructor() {
    super();
  }
}
