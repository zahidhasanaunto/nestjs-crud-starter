import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from '@src/app/types';
import {
  CreateQuestionDTO,
  FilterQuestionDTO,
  UpdateQuestionDTO,
} from '../dtos';
import { Question } from '../entities/question.entity';
import { QuestionService } from '../services/question.service';

@ApiTags('Question')
@ApiBearerAuth()
@Controller('questions')
export class QuestionController {
  RELATIONS = ['answers'];

  constructor(private readonly service: QuestionService) {}

  @Get()
  async findAll(
    @Query() query: FilterQuestionDTO
  ): Promise<SuccessResponse | Question[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Question> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  async createOne(@Body() body: CreateQuestionDTO): Promise<Question> {
    return this.service.createQuestion(body);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateQuestionDTO
  ): Promise<Question> {
    return this.service.updateQuestion(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<SuccessResponse> {
    return this.service.deleteOneBase(id);
  }
}
