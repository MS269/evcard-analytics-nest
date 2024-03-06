import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { OracledbConfigModule } from '../oracledb-config/oracledb-config.module';
import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        CacheModule.register(),
        OracledbConfigModule,
      ],
      providers: [CardService],
    }).compile();

    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRemainingCardCount()', () => {
    it('should return the remaining card count', async () => {
      // given
      // when
      const result = await service.getRemainingCardCount();

      // then
      expect(result).toBeDefined();
    });
  });

  describe('getUsingCardCount()', () => {
    it('should return the using card count', async () => {
      // given
      // when
      const result = await service.getUsingCardCount();

      // then
      expect(result).toBeDefined();
    });
  });

  describe('getUsingCardCountByDate()', () => {
    it('should return the using card count by the date', async () => {
      // given
      const date = '240101';

      // when
      const result = await service.getUsingCardCountByDate(date);

      // then
      expect(result).toBeDefined();
    });
  });

  describe('getUsingCardCountFromDate()', () => {
    it('should return the using card count from the date', async () => {
      // given
      const start = '240101';

      // when
      const result = await service.getUsingCardCountFromDate(start);

      // then
      expect(result).toBeDefined();
    });
  });

  describe('getUsingCardCountBetweenDates()', () => {
    it('should return the using card count between the dates', async () => {
      // given
      const start = '240101';
      const end = '240131';

      // when
      const result = await service.getUsingCardCountBetweenDates(start, end);

      // then
      expect(result).toBeDefined();
    });
  });
});
