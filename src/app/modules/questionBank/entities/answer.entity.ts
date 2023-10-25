import { BaseEntity } from '@src/app/base';
import { ENUM_TABLE_NAMES } from '@src/shared';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Question } from './question.entity';
import { Type } from 'class-transformer';

@Entity(ENUM_TABLE_NAMES.ANSWERS, {
  orderBy: {
    createdAt: 'ASC',
  },
})
export class Answer extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = [];

  @Column({ nullable: false })
  value?: string;

  @ManyToOne((t) => Question, { onDelete: 'CASCADE' })
  @Type((t) => Question)
  question?: Question;

  @RelationId((e: Answer) => e.question)
  questionId?: number;

  constructor() {
    super();
  }
}
