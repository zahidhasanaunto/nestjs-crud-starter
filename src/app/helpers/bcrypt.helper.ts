import { Injectable } from '@nestjs/common';
import { ENV } from '@src/env';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class BcryptHelper {
  public hash(plainText: string, saltRounds: number = ENV.jwt.saltRound) {
    return hash(plainText, saltRounds);
  }

  public compareHash(plainText: string, hashString: string) {
    return compare(plainText, hashString);
  }
}
