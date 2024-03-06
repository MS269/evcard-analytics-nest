import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { OracledbConfigService } from './oracledb-config.service';

describe('OracledbConfigService', () => {
  let service: OracledbConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [OracledbConfigService],
    }).compile();

    service = module.get<OracledbConfigService>(OracledbConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get()', () => {
    it('should return the oracledb config', () => {
      // given
      // when
      const result = service.get();

      // then
      expect(result.user).toBeDefined();
      expect(result.password).toBeDefined();
      expect(result.connectString).toBeDefined();
    });
  });
});
