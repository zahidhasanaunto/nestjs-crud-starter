import {
  defaultColumns,
  defaultDateTimeColumns,
  ENUM_COLUMN_TYPES,
  ENUM_TABLE_NAMES,
} from '@src/shared';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserRoles1679859197350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ENUM_TABLE_NAMES.USER_ROLES,
        columns: [
          {
            name: 'id',
            type: ENUM_COLUMN_TYPES.UUID,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'roleId',
            type: ENUM_COLUMN_TYPES.UUID,
            isNullable: false,
          },
          {
            name: 'userId',
            type: ENUM_COLUMN_TYPES.UUID,
            isNullable: false,
          },
          ...defaultDateTimeColumns,
          ...defaultColumns,
        ],
        foreignKeys: [
          {
            name: 'fk_user_roles_role_id',
            columnNames: ['roleId'],
            referencedTableName: ENUM_TABLE_NAMES.ROLES,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
          },
          {
            name: 'fk_user_roles_user_id',
            columnNames: ['userId'],
            referencedTableName: ENUM_TABLE_NAMES.USERS,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(ENUM_TABLE_NAMES.USER_ROLES);
    await queryRunner.dropForeignKey(
      ENUM_TABLE_NAMES.USER_ROLES,
      table.foreignKeys.find((fk) => fk.columnNames.indexOf('roleId') !== -1)
    );
    await queryRunner.dropForeignKey(
      ENUM_TABLE_NAMES.USER_ROLES,
      table.foreignKeys.find((fk) => fk.columnNames.indexOf('userId') !== -1)
    );
    await queryRunner.dropTable(ENUM_TABLE_NAMES.USER_ROLES);
  }
}
