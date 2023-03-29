import { ENUM_COLUMN_TYPES } from '@src/shared';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: ENUM_COLUMN_TYPES.BOOLEAN, default: true, nullable: true })
  isActive?: boolean;

  @Column({ type: ENUM_COLUMN_TYPES.VARCHAR, nullable: true, select: false })
  createdBy?: string;

  @Column({ type: ENUM_COLUMN_TYPES.VARCHAR, nullable: true, select: false })
  updatedBy?: string;

  @Column({ type: ENUM_COLUMN_TYPES.VARCHAR, nullable: true, select: false })
  deletedBy?: string;

  @CreateDateColumn({ type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC })
  createdAt?: Date;

  @UpdateDateColumn({ type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false, type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC })
  deletedAt?: Date;
}
