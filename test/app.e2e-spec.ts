import { CacheModule } from '@nestjs/cache-manager';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), CacheModule.register(), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const authService = app.get<AuthService>(AuthService);
    token = await authService.getAuthToken();
  });

  it('/api/v1/ping (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/ping')
      .expect(200)
      .expect({});
  });

  it('/api/v1/cards?status=false (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/cards?status=false')
      .auth(token, { type: 'bearer' })
      .expect(200);
  });

  it('/api/v1/cards?status=true (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/cards?status=true')
      .auth(token, { type: 'bearer' })
      .expect(200);
  });

  it('/api/v1/cards?date=240101 (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/cards?date=240101')
      .auth(token, { type: 'bearer' })
      .expect(200);
  });

  it('/api/v1/cards?start=240101 (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/cards?start=240101')
      .auth(token, { type: 'bearer' })
      .expect(200);
  });

  it('/api/v1/cards?start=240101&end=240131 (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/cards?start=240101&end=240131')
      .auth(token, { type: 'bearer' })
      .expect(200);
  });
});
