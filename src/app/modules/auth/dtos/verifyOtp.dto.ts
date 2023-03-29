import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class VerifyOtpDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: '01636476123',
  })
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
  readonly phoneNumber!: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 123456,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly otp!: number;
}
