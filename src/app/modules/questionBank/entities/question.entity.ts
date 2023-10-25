import { BaseEntity } from '@src/app/base';
import { ENUM_TABLE_NAMES } from '@src/shared';
import { Column, Entity, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';
import { Type } from 'class-transformer';

@Entity(ENUM_TABLE_NAMES.QUESTIONS, {
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Question extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = ['statement', 'questionType'];

  @Column({ nullable: false })
  statement?: string;

  @Column({ nullable: false, default: 'MCQ' })
  questionType?: string;

  @Column({ nullable: true })
  mcqAnswerType?: string;

  @Column({ nullable: true, default: 0 })
  points?: number;

  @OneToMany((t) => Answer, (e) => e.question)
  @Type((t) => Answer)
  answers?: Answer[];

  constructor() {
    super();
  }
}
