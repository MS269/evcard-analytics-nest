import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async onApplicationBootstrap() {
    const token = await this.getAuthToken();
    this.logger.log(`Auth token = ${token}`);
  }

  async getAuthToken() {
    return this.jwtService.signAsync(
      { password: this.configService.get('AUTH_PASSWORD') },
      { secret: this.configService.get('AUTH_SECRET') },
    );
  }
}
