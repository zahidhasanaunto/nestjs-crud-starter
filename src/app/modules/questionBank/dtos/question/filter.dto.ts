import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, IsEmail } from 'class-validator';

export class FilterQuestionDTO {
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
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly searchTerm!: string;

  @ApiProperty({
    type: String,
    description: 'MCQ',
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly questionType!: string;
}
