import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class VerifyResetPasswordDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'aunto@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'hash string',
  })
  @IsNotEmpty()
  @IsString()
  readonly hash!: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 1234,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly otp!: number;

  @ApiProperty({
    type: String,
    required: true,
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  readonly newPassword!: string;
}
