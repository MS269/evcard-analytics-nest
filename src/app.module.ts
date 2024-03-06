import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { OracledbConfigModule } from './oracledb-config/oracledb-config.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OracledbConfigModule,
    AuthModule,
    CardModule,
  ],
  providers: [],
  controllers: [AppController],
  exports: [],
})
export class AppModule {}
