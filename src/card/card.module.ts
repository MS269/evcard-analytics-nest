import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { OracledbConfigModule } from '../oracledb-config/oracledb-config.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [CacheModule.register(), OracledbConfigModule],
  providers: [CardService],
  controllers: [CardController],
  exports: [],
})
export class CardModule {}
