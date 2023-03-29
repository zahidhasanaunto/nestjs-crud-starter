import {
  defaultColumns,
  defaultDateTimeColumns,
  ENUM_COLUMN_TYPES,
  ENUM_TABLE_NAMES,
} from '@src/shared';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1679858700286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ENUM_TABLE_NAMES.USERS,
        columns: [
          {
            name: 'id',
            type: ENUM_COLUMN_TYPES.UUID,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'fullName',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '256',
            isNullable: true,
          },
          {
            name: 'firstName',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '128',
            isNullable: true,
          },
          {
            name: 'lastName',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '128',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '256',
            isNullable: true,
          },
          {
            name: 'email',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '128',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'phoneNumber',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '20',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'username',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '128',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'password',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '256',
            isNullable: true,
          },
          {
            name: 'accessToken',
            type: ENUM_COLUMN_TYPES.TEXT,
            isNullable: true,
          },
          {
            name: 'refreshToken',
            type: ENUM_COLUMN_TYPES.TEXT,
            isNullable: true,
          },
          {
            name: 'permissionToken',
            type: ENUM_COLUMN_TYPES.TEXT,
            isNullable: true,
          },
          ...defaultDateTimeColumns,
          ...defaultColumns,
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ENUM_TABLE_NAMES.USERS);
  }
}
