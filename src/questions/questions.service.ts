import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async getPaginatedQuestions(page: number, limit: number): Promise<any> {
    page = Math.max(page, 1);
    limit = Math.min(Math.max(limit, 1), 100);

    const offset = (page - 1) * limit;

    const questions = await this.questionRepository.query(
      `SELECT * FROM questions ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const totalQuestions = await this.questionRepository.query(
      `SELECT COUNT(*) FROM questions`,
    );
    const total = parseInt(totalQuestions[0].count, 10);

    const totalPages = Math.ceil(total / limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      total,
      page,
      limit,
      totalPages,
      nextPage,
      prevPage,
      data: questions,
    };
  }
}