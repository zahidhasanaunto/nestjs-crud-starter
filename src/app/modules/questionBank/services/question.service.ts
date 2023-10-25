import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';
import { DataSource, Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import {
  CreateQuestionAnswerDTO,
  CreateQuestionDTO,
  UpdateQuestionAnswerDTO,
  UpdateQuestionDTO,
} from '../dtos';
import { asyncForEach } from '@src/shared';
import { Answer } from '../entities/answer.entity';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class QuestionService extends BaseService<Question> {
  constructor(
    @InjectRepository(Question)
    private readonly _repo: Repository<Question>,
    private readonly dataSource: DataSource
  ) {
    super(_repo);
  }

  async createQuestion(payload: CreateQuestionDTO): Promise<Question> {
    const { answers, ...createQuestionData } = payload;

    const questionData: Question = {
      ...createQuestionData,
    };

    let createdQuestion: Question = null;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      createdQuestion = await queryRunner.manager.save<Question>(
        Object.assign(new Question(), questionData)
      );

      if (!createdQuestion) {
        throw new BadRequestException('Question not created');
      }

      if (answers && answers.length) {
        await asyncForEach(
          answers,
          async (answer: CreateQuestionAnswerDTO, i) => {
            const answerData: Answer = {
              ...answer,
              question: { id: createdQuestion.id },
            };
            const createdAnswer = await queryRunner.manager.save(
              Object.assign(new Answer(), answerData)
            );
            if (!createdAnswer) {
              throw new BadRequestException('Answer not created');
            }
          }
        );
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message || 'Question not created');
    } finally {
      await queryRunner.release();
    }

    const question = await this.findByIdBase(createdQuestion.id, {
      relations: ['answers'],
    });
    return question;
  }

  async updateQuestion(
    questionId: string,
    payload: UpdateQuestionDTO
  ): Promise<Question> {
    const { answers, ...updateQuestionData } = payload;

    const questionData: Question = {
      ...updateQuestionData,
    };

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (isNotEmptyObject(questionData)) {
        await queryRunner.manager.update<Question>(
          Question,
          questionId,
          questionData
        );
      }

      if (answers && answers.length) {
        const newlyAddedAnswers = answers.filter(
          (answer) => answer.value && !answer.id && !answer.isDeleted
        );
        const updatedAnswers = answers.filter(
          (answer) => answer.value && answer.id && !answer.isDeleted
        );
        const deletedAnswers = answers.filter(
          (answer) => answer.isDeleted && answer.id
        );

        await asyncForEach(
          newlyAddedAnswers,
          async (answer: UpdateQuestionAnswerDTO, i) => {
            const answerData: Answer = {
              ...answer,
              question: { id: questionId },
            };
            const createdAnswer = await queryRunner.manager.save(
              Object.assign(new Answer(), answerData)
            );
            if (!createdAnswer) {
              throw new BadRequestException('Answer not created');
            }
          }
        );

        await asyncForEach(
          updatedAnswers,
          async (answer: UpdateQuestionAnswerDTO, i) => {
            const updatedAnswer = await queryRunner.manager.update(
              Answer,
              answer.id,
              {
                value: answer.value,
              }
            );
            if (!updatedAnswer) {
              throw new BadRequestException('Answer not updated');
            }
          }
        );

        await asyncForEach(
          deletedAnswers,
          async (answer: UpdateQuestionAnswerDTO, i) => {
            const deletedAnswer = await queryRunner.manager.delete(
              Answer,
              answer.id
            );
            if (!deletedAnswer) {
              throw new BadRequestException('Answer not deleted');
            }
          }
        );
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message || 'Question not created');
    } finally {
      await queryRunner.release();
    }

    const question = await this.findByIdBase(questionId, {
      relations: ['answers'],
    });
    return question;
  }
}
