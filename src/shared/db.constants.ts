import { TableColumnOptions } from 'typeorm';

export enum ENUM_TABLE_NAMES {
  PERMISSIONS = 'permissions',
  PERMISSION_TYPES = 'permission_types',
  ROLES = 'roles',
  USERS = 'users',
  USER_ROLES = 'user_roles',
  ROLE_PERMISSIONS = 'role_permissions',
  AUTH_STATS = 'auth_stats',
}

export enum ENUM_SEQUENCE {
  PRODUCT_CODE_SEQ = 'product_code_seq',
  ORDER_CODE_SEQ = 'order_code_seq',
}

export enum ENUM_COLUMN_TYPES {
  UUID = 'uuid',
  INT = 'int',
  FLOAT = 'float',
  TEXT = 'text',
  VARCHAR = 'varchar',
  BOOLEAN = 'boolean',
  TIMESTAMP_UTC = 'timestamp without time zone',
  ENUM = 'enum',
}

export const defaultDateTimeColumns: TableColumnOptions[] = [
  {
    name: 'createdAt',
    type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC,
    default: 'NOW()',
    isNullable: true,
  },
  {
    name: 'updatedAt',
    type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC,
    isNullable: true,
  },
  {
    name: 'deletedAt',
    type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC,
    isNullable: true,
  },
];

export const defaultColumns: TableColumnOptions[] = [
  {
    name: 'createdBy',
    type: ENUM_COLUMN_TYPES.UUID,
    isNullable: true,
  },
  {
    name: 'updatedBy',
    type: ENUM_COLUMN_TYPES.UUID,
    isNullable: true,
  },
  {
    name: 'deletedBy',
    type: ENUM_COLUMN_TYPES.UUID,
    isNullable: true,
  },
  {
    name: 'isActive',
    type: ENUM_COLUMN_TYPES.BOOLEAN,
    isNullable: true,
    default: true,
  },
];
