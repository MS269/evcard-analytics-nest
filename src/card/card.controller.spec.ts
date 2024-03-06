import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { OracledbConfigModule } from '../oracledb-config/oracledb-config.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';

describe('CardController', () => {
  let controller: CardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        CacheModule.register(),
        OracledbConfigModule,
      ],
      providers: [CardService],
      controllers: [CardController],
    }).compile();

    controller = module.get<CardController>(CardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('root', () => {
    it('should return the card cound with status=false', async () => {
      // given
      const req = { query: { status: 'false' } };

      // when
      const result = await controller.getCardCount(req as any);

      // then
      expect(result).toBeDefined();
    });

    it('should return the card count with status=true', async () => {
      // given
      const req = { query: { status: 'true' } };

      // when
      const result = await controller.getCardCount(req as any);

      // then
      expect(result).toBeDefined();
    });

    it('should return the card count with date=240101', async () => {
      // given
      const req = { query: { date: '240101' } };

      // when
      const result = await controller.getCardCount(req as any);

      // then
      expect(result).toBeDefined();
    });

    it('should return the card count with start=240101', async () => {
      // given
      const req = { query: { start: '240101' } };

      // when
      const result = await controller.getCardCount(req as any);

      // then
      expect(result).toBeDefined();
    });

    it('should return the card count with start=240101 and end=240131', async () => {
      // given
      const req = { query: { start: '240101', end: '240131' } };

      // when
      const result = await controller.getCardCount(req as any);

      // then
      expect(result).toBeDefined();
    });
  });
});
