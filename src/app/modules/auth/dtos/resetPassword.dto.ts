import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'aunto@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;
}
