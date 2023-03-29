import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '@src/app/base';
import { IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterPermissionDTO extends BaseDTO {
  @ApiProperty({
    type: Number,
    description: 'Limit the number of results',
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  readonly limit: number = 10;

  @ApiProperty({
    type: Number,
    description: 'The page number',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  readonly page: number = 1;

  @ApiProperty({
    type: String,
    description: 'The search term',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly searchTerm!: string;

  @ApiProperty({
    type: String,
    description: 'permission type id',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  readonly permissionType!: any;
}
