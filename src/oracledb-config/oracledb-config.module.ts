import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OracledbConfigService } from './oracledb-config.service';

@Module({
  imports: [ConfigModule],
  providers: [OracledbConfigService],
  exports: [OracledbConfigService],
})
export class OracledbConfigModule {}
