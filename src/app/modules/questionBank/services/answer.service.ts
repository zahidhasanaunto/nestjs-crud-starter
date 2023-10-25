import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/app/base/base.service';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswerService extends BaseService<Answer> {
  constructor(
    @InjectRepository(Answer)
    private readonly _repo: Repository<Answer>
  ) {
    super(_repo);
  }
}
