import {
  defaultColumns,
  defaultDateTimeColumns,
  ENUM_COLUMN_TYPES,
  ENUM_TABLE_NAMES,
} from '@src/shared';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Roles1679858312718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ENUM_TABLE_NAMES.ROLES,
        columns: [
          {
            name: 'id',
            type: ENUM_COLUMN_TYPES.UUID,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'title',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '256',
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
    await queryRunner.dropTable(ENUM_TABLE_NAMES.ROLES);
  }
}
