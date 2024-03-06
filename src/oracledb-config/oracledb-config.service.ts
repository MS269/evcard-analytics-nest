import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConnectionAttributes } from 'oracledb';

@Injectable()
export class OracledbConfigService {
  constructor(private readonly configService: ConfigService) {}

  get(): ConnectionAttributes {
    return {
      user: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      connectString: this.configService.get('DB_CONNECT_STRING'),
    } satisfies ConnectionAttributes;
  }
}
