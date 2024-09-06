import { Controller, Get, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getQuestions(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    return this.questionsService.getPaginatedQuestions(page, limit);
  }
}
