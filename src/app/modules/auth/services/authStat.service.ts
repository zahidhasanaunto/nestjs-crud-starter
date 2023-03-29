import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base';
import { ENV } from '@src/env';
import { Repository } from 'typeorm';
import { AuthStat } from '../entities/authStat.entity';

@Injectable()
export class AuthStatService extends BaseService<AuthStat> {
  constructor(
    @InjectRepository(AuthStat)
    private readonly authStatRepository: Repository<AuthStat>
  ) {
    super(authStatRepository);
  }

  async createOrUpdateOtpByPhoneNumber(phoneNumber: string, otp: number) {
    const isExist = await this.findOneBase({ phoneNumber });
    if (isExist && !this.isOtpExpired(isExist.otpExpiryAt)) {
      return isExist;
    } else if (isExist && this.isOtpExpired(isExist.otpExpiryAt)) {
      const otpExpiryAt = this.getOtpExpiryTime();

      await this.updateOneBase(isExist.id, { otp, otpExpiryAt });
    } else {
      const otpExpiryAt = this.getOtpExpiryTime();

      await this.createOneBase({
        phoneNumber,
        otp,
        otpExpiryAt: otpExpiryAt as any,
      });
    }
    return this.findOneBase({ phoneNumber });
  }

  async verifyOtp(phoneNumber: string, otp: number): Promise<AuthStat> {
    const isExist = await this.findOneBase({ phoneNumber });

    if (!isExist) {
      throw new BadRequestException('OTP not sent');
    }

    if (isExist.otp !== otp) {
      throw new BadRequestException('OTP not matched');
    }

    const isExpired = this.isOtpExpired(isExist.otpExpiryAt);

    if (isExpired) {
      throw new BadRequestException('OTP expired');
    }

    return isExist;
  }

  isOtpExpired(otpExpiryAt: Date) {
    return otpExpiryAt.getTime() < new Date().getTime();
  }

  getOtpExpiryTime() {
    const current = new Date();
    current.setMinutes(current.getMinutes() + ENV.auth.otpExpireIn);
    const otpExpiryTime = current.toISOString();
    return otpExpiryTime;
  }
}
