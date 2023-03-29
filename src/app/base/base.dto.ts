import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';

export class BaseDTO {
  @IsBooleanString()
  @IsOptional()
  @ApiProperty({ required: false })
  isActive: boolean;
}
