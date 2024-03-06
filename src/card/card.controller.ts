import { BadRequestException, Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { Private } from '../auth/decorators/private.decorator';
import { CardService } from './card.service';

@Private()
@Controller('api/v1/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async getCardCount(@Req() req: Request) {
    const { status, date, start, end } = req.query;

    if (
      status === 'false' &&
      date === undefined &&
      start === undefined &&
      end === undefined
    ) {
      return this.cardService.getRemainingCardCount();
    }

    if (
      status === 'true' &&
      date === undefined &&
      start === undefined &&
      end === undefined
    ) {
      return this.cardService.getUsingCardCount();
    }

    if (
      status === undefined &&
      typeof date === 'string' &&
      start === undefined &&
      end === undefined
    ) {
      return this.cardService.getUsingCardCountByDate(date);
    }

    if (
      status === undefined &&
      date === undefined &&
      typeof start === 'string' &&
      end === undefined
    ) {
      return this.cardService.getUsingCardCountFromDate(start);
    }

    if (
      status === undefined &&
      date === undefined &&
      typeof start === 'string' &&
      typeof end === 'string'
    ) {
      return this.cardService.getUsingCardCountBetweenDates(start, end);
    }

    throw new BadRequestException();
  }
}
