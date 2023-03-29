import {
  defaultColumns,
  defaultDateTimeColumns,
  ENUM_COLUMN_TYPES,
  ENUM_TABLE_NAMES,
} from '@src/shared';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AuthStats1679859996180 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ENUM_TABLE_NAMES.AUTH_STATS,
        columns: [
          {
            name: 'id',
            type: ENUM_COLUMN_TYPES.UUID,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'phoneNumber',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '20',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'otp',
            type: ENUM_COLUMN_TYPES.INT,
            isNullable: true,
          },
          {
            name: 'otpExpiryAt',
            type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC,
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
    await queryRunner.dropTable(ENUM_TABLE_NAMES.AUTH_STATS);
  }
}
