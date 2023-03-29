import { BaseEntity } from '@src/app/base';
import { ENUM_TABLE_NAMES, ENUM_COLUMN_TYPES } from '@src/shared';
import { Column, Entity } from 'typeorm';

@Entity(ENUM_TABLE_NAMES.AUTH_STATS)
export class AuthStat extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = ['phoneNumber'];

  @Column({ unique: true, nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  otp?: number;

  @Column({ nullable: true, type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC })
  otpExpiryAt?: Date;

  constructor() {
    super();
  }
}
