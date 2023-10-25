import { ApiProperty } from '@nestjs/swagger';
import { ENUM_MCQ_ANSWER_TYPES } from '@src/shared/common.enums';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class UpdateQuestionAnswerDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Answer 1',
  })
  @IsOptional()
  @IsString()
  readonly value!: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'answer id',
  })
  @ValidateIf((o) => o.isDeleted === true)
  @IsNotEmpty()
  @IsUUID()
  readonly id!: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly isDeleted!: boolean;
}

export class UpdateQuestionDTO {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Question 1',
  })
  @IsOptional()
  @IsString()
  readonly statement!: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'MCQ',
  })
  @IsOptional()
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
    required: false,
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  readonly points!: number;

  @ApiProperty({
    type: [UpdateQuestionAnswerDTO],
    required: false,
    example: [
      {
        value: 'Answer 1',
        id: 'answer id',
        isDeleted: false,
      },
      {
        value: 'Answer 2',
        id: 'answer id',
        isDeleted: false,
      },
    ],
  })
  @ValidateNested()
  @Type(() => UpdateQuestionAnswerDTO)
  @IsOptional()
  readonly answers!: UpdateQuestionAnswerDTO[];
}
