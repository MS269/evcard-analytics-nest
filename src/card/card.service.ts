import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { isMatch } from 'date-fns';
import { Connection, getConnection } from 'oracledb';

import { OracledbConfigService } from '../oracledb-config/oracledb-config.service';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly oracledbConfigService: OracledbConfigService,
  ) {}

  async getRemainingCardCount() {
    const cached = await this.cacheManager.get<number>(
      `getRemainingCardCount()`,
    );

    if (typeof cached === 'number') {
      return cached;
    }

    let connection: Connection;

    try {
      connection = await getConnection(this.oracledbConfigService.get());

      const result = await connection.execute<number>(
        `SELECT count(CARD_NO) FROM EV_CARD_T WHERE STATUS = 0`,
      );

      if (!result.rows) {
        throw new InternalServerErrorException('RemainingCardCount not found');
      }

      const count = result.rows[0];
      await this.cacheManager.set(`getRemainingCardCount()`, count);
      return count;
    } catch (error) {
      this.logger.error(error);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          this.logger.error(error);
        }
      }
    }
  }

  async getUsingCardCount(): Promise<number> {
    const cached = await this.cacheManager.get<number>(`getUsingCardCount()`);

    if (typeof cached === 'number') {
      return cached;
    }

    let connection: Connection;

    try {
      connection = await getConnection(this.oracledbConfigService.get());

      const result = await connection.execute<number>(
        `SELECT count(CARD_NO) FROM EV_CARD_T WHERE STATUS = 1`,
      );

      if (!result.rows) {
        throw new InternalServerErrorException('UsingCardCount not found');
      }

      const count = result.rows[0];
      await this.cacheManager.set(`getUsingCardCount()`, count);
      return count;
    } catch (error) {
      this.logger.error(error);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          this.logger.error(error);
        }
      }
    }
  }

  async getUsingCardCountByDate(date: string): Promise<number> {
    const formatStr = 'yyMMdd';

    if (!isMatch(date, formatStr)) {
      throw new BadRequestException();
    }

    const cached = await this.cacheManager.get<number>(
      `getUsingCardCountByDate(${date})`,
    );

    if (typeof cached === 'number') {
      return cached;
    }

    let connection: Connection;

    try {
      connection = await getConnection(this.oracledbConfigService.get());

      const result = await connection.execute<number>(
        `SELECT count(CARD_NO) FROM EV_CARD_T
        WHERE to_char(EDT_DT, 'YYMMDD') = :1`,
        [date],
      );

      if (!result.rows) {
        throw new InternalServerErrorException(
          'UsingCardCountByDate not found',
        );
      }

      const count = result.rows[0];
      await this.cacheManager.set(`getUsingCardCountByDate(${date})`, count);
      return count;
    } catch (error) {
      this.logger.error(error);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          this.logger.error(error);
        }
      }
    }
  }

  async getUsingCardCountFromDate(start: string): Promise<number> {
    const formatStr = 'yyMMdd';

    if (!isMatch(start, formatStr)) {
      throw new BadRequestException();
    }

    const cached = await this.cacheManager.get<number>(
      `getUsingCardCountFromDate(${start})`,
    );

    if (typeof cached === 'number') {
      return cached;
    }

    let connection: Connection;

    try {
      connection = await getConnection(this.oracledbConfigService.get());

      const result = await connection.execute<number>(
        `SELECT count(CARD_NO) FROM EV_CARD_T
        WHERE to_char(EDT_DT, 'YYMMDD') >= :1`,
        [start],
      );

      if (!result.rows) {
        throw new InternalServerErrorException(
          'UsingCardCountFromDate not found',
        );
      }

      const count = result.rows[0];
      await this.cacheManager.set(`getUsingCardCountFromDate(${start})`, count);
      return count;
    } catch (error) {
      this.logger.error(error);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          this.logger.error(error);
        }
      }
    }
  }

  async getUsingCardCountBetweenDates(
    start: string,
    end: string,
  ): Promise<number> {
    const formatStr = 'yyMMdd';

    if (!isMatch(start, formatStr) || !isMatch(end, formatStr)) {
      throw new BadRequestException();
    }

    const cached = await this.cacheManager.get<number>(
      `getUsingCardCountBetweenDates(${start},${end})`,
    );

    if (typeof cached === 'number') {
      return cached;
    }

    let connection: Connection;

    try {
      connection = await getConnection(this.oracledbConfigService.get());

      const result = await connection.execute<number>(
        `SELECT count(CARD_NO) FROM EV_CARD_T
        WHERE to_char(EDT_DT, 'YYMMDD') >= :1
        AND to_char(EDT_DT, 'YYMMDD') <= :2`,
        [start, end],
      );

      if (!result.rows) {
        throw new InternalServerErrorException(
          'UsingCardCountBetweenDates not found',
        );
      }

      const count = result.rows[0];
      await this.cacheManager.set(
        `getUsingCardCountBetweenDates(${start},${end})`,
        count,
      );
      return count;
    } catch (error) {
      this.logger.error(error);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          this.logger.error(error);
        }
      }
    }
  }
}
