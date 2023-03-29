import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SendOtpDTO {
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
}
