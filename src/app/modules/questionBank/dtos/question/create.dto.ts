import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyArray } from '@src/app/decorators';
import { ENUM_MCQ_ANSWER_TYPES } from '@src/shared/common.enums';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateQuestionAnswerDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Answer 1',
  })
  @IsNotEmpty()
  @IsString()
  readonly value!: string;
}

export class CreateQuestionDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Question 1',
  })
  @IsNotEmpty()
  @IsString()
  readonly statement!: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'MCQ',
  })
  @IsNotEmpty()
  @IsString()
  readonly questionType!: string;

  @ApiProperty({
    type: String,
    required: false,
    example: ENUM_MCQ_ANSWER_TYPES.SINGLE_CHOICE,
  })
  @IsOptional()
  @IsEnum(ENUM_MCQ_ANSWER_TYPES)
  readonly mcqAnswerType!: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly points!: number;

  @ApiProperty({
    type: [CreateQuestionAnswerDTO],
    required: false,
    example: [
      {
        value: 'Answer 1',
      },
      {
        value: 'Answer 2',
      },
    ],
  })
  @ValidateNested()
  @Type(() => CreateQuestionAnswerDTO)
  @IsNotEmptyArray()
  readonly answers!: CreateQuestionAnswerDTO[];
}
