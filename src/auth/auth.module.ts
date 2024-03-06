import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [],
  exports: [],
})
export class AuthModule {}
