import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'refresh token',
  })
  @IsNotEmpty()
  @IsString()
  readonly refreshToken!: string;
}
